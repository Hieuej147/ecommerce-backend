from langchain.tools import tool

@tool
def send_email(to_email: str, subject: str, content: str) -> dict:
    """Send an email to a recipient with a given subject and content.
    Call this tool when the user clicks an 'Approve' or 'Send' button on the UI that dispatches the send_email event.
    """
    # Simulated business logic
    print(f"=====================================")
    print(f"📧 BUSINESS LOGIC TRIGGERED: SENDING EMAIL")
    print(f"To: {to_email}")
    print(f"Subject: {subject}")
    print(f"Content: {content}")
    print(f"=====================================")
    
    return {
        "status": "success",
        "message": f"Email successfully sent to {to_email}!"
    }
