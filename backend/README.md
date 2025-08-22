# OpenAI API Connection Setup

This project shows you how to connect to the OpenAI API (ChatGPT+) and use it for various tasks.

## 🚀 Quick Setup

### 1. Get Your API Key
- Go to [platform.openai.com](https://platform.openai.com)
- Sign in or create an account
- Navigate to "API Keys" in your dashboard
- Click "Create new secret key"
- Copy the key (it starts with `sk-`)

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Set Your API Key
Choose one of these methods:

**Option A: Environment Variable (Recommended)**
```bash
export OPENAI_API_KEY="sk-your_actual_api_key_here"
```

**Option B: Create a .env file**
```bash
echo "OPENAI_API_KEY=sk-your_actual_api_key_here" > .env
```

**Option C: Set it in your shell profile**
Add this line to your `~/.zshrc` or `~/.bashrc`:
```bash
export OPENAI_API_KEY="sk-your_actual_api_key_here"
```
Then reload: `source ~/.zshrc`

### 4. Test the Connection
```bash
python config.py
```

### 5. Run Examples
```bash
python example_usage.py
```

## 🔧 Usage Examples

### Chat Completion
```python
from config import get_openai_client

client = get_openai_client()
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}],
    max_tokens=100
)
print(response.choices[0].message.content)
```

### Image Generation
```python
from config import get_openai_client

client = get_openai_client()
response = client.images.generate(
    model="dall-e-3",
    prompt="A beautiful sunset over mountains",
    size="1024x1024"
)
print(response.data[0].url)
```

## 📝 Available Models

- **GPT-4**: `gpt-4`, `gpt-4-turbo-preview`
- **GPT-3.5**: `gpt-3.5-turbo`
- **Image Generation**: `dall-e-3`, `dall-e-2`

## ⚠️ Important Notes

- Keep your API key secret and never commit it to version control
- The API has usage limits and costs associated with it
- Monitor your usage in the OpenAI dashboard
- Use environment variables for security

## 🆘 Troubleshooting

**"API key not set" error:**
- Make sure you've set the `OPENAI_API_KEY` environment variable
- Check that the key starts with `sk-`
- Try restarting your terminal after setting the variable

**"Invalid API key" error:**
- Verify your API key is correct
- Check if your account has sufficient credits
- Ensure your account is active

**Rate limit errors:**
- Wait a moment and try again
- Check your usage limits in the OpenAI dashboard
