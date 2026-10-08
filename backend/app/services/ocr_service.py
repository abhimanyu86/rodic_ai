from typing import Optional
from app.models.schemas import AksharDrishtiOCRResult, OCRRequest

class OCRService:
    """
    AksharDrishti Document Extraction Service.
    Extracts structured document metadata from civic bills & proof documents.
    """

    def extract_document(self, request: Optional[OCRRequest] = None) -> AksharDrishtiOCRResult:
        doc_type = request.document_type if request and request.document_type else "Water Bill (Municipal)"
        
        if "elec" in doc_type.lower() or "power" in doc_type.lower():
            return AksharDrishtiOCRResult(
                document_type="Electricity Bill (TANGEDCO/Discom)",
                consumer_name="Rajesh Kumar",
                connection_no="CONN-7741-E",
                confidence=0.96,
                extracted_text="TANGEDCO Consumer #04-128-005 | Meter: TN-8812 | Rajesh Kumar, Anna Nagar, Chennai",
                billing_period="August 2026",
                amount_due="₹ 1,820.00"
            )
        
        return AksharDrishtiOCRResult(
            document_type="Water Bill (Municipal)",
            consumer_name="Rajesh Kumar",
            connection_no="CONN-8892-A",
            confidence=0.94,
            extracted_text="Chennai Metro Water Supply & Sewerage Board | Account #CONN-8892-A | Ward 12 Anna Nagar",
            billing_period="Sept-Oct 2026",
            amount_due="₹ 450.00"
        )

ocr_service = OCRService()
