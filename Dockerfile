FROM node:20-slim

RUN apt-get update && apt-get install -y --no-install-recommends python3 python3-pip python3-venv \
    && rm -rf /var/lib/apt/lists/*

USER node
ENV HOME=/home/node PATH=/home/node/venv/bin:$PATH
WORKDIR /home/node/app

# Backend deps
RUN python3 -m venv /home/node/venv
COPY --chown=node backend/requirements.txt backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Frontend deps + build (relative API base; Next rewrites /api -> backend on :8000)
COPY --chown=node frontend/package.json frontend/package-lock.json frontend/
RUN cd frontend && npm ci
COPY --chown=node . .
ENV NEXT_PUBLIC_API_BASE=/api/v1
RUN cd frontend && npm run build

EXPOSE 7860
CMD ["sh", "-c", "cd backend && uvicorn app.main:app --host 127.0.0.1 --port 8000 & cd frontend && npx next start -p ${PORT:-7860}"]
