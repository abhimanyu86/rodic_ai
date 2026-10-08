FROM node:20-slim

RUN apt-get update && apt-get install -y --no-install-recommends python3 python3-pip python3-venv \
    && rm -rf /var/lib/apt/lists/*

# HF Spaces runs as uid 1000
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user PATH=/home/user/venv/bin:$PATH
WORKDIR /home/user/app

# Backend deps
RUN python3 -m venv /home/user/venv
COPY --chown=user backend/requirements.txt backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Frontend deps + build (relative API base; Next rewrites /api -> backend on :8000)
COPY --chown=user frontend/package.json frontend/package-lock.json frontend/
RUN cd frontend && npm ci
COPY --chown=user . .
ENV NEXT_PUBLIC_API_BASE=/api/v1
RUN cd frontend && npm run build

EXPOSE 7860
CMD ["sh", "-c", "cd backend && uvicorn app.main:app --host 127.0.0.1 --port 8000 & cd frontend && npx next start -p 7860"]
