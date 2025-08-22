import os
from openai import OpenAI

def get_openai_client():
    """
    Get an OpenAI client instance with your API key.
    
    Make sure to set your OPENAI_API_KEY environment variable:
    export OPENAI_API_KEY="your_actual_api_key_here"
    
    Or create a .env file with:
    OPENAI_API_KEY=your_actual_api_key_here
    """
    api_key = os.getenv('OPENAI_API_KEY')
    
    if not api_key:
        raise ValueError(
            "OPENAI_API_KEY environment variable not set. "
            "Please set it with: export OPENAI_API_KEY='your_api_key_here'"
        )
    
    return OpenAI(api_key=api_key)

def test_connection():
    """Test the API connection with a simple request."""
    try:
        client = get_openai_client()
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": "Hello! This is a test message."}],
            max_tokens=50
        )
        print("✅ API connection successful!")
        print(f"Response: {response.choices[0].message.content}")
        return True
    except Exception as e:
        print(f"❌ API connection failed: {e}")
        return False

if __name__ == "__main__":
    test_connection()
