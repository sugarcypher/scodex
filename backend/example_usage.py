#!/usr/bin/env python3
"""
Example usage of OpenAI API for various tasks.
Make sure you have set your OPENAI_API_KEY environment variable first.
"""

import os
from config import get_openai_client

def chat_with_gpt(prompt, model="gpt-4"):
    """Send a message to ChatGPT and get a response."""
    client = get_openai_client()
    
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1000,
        temperature=0.7
    )
    
    return response.choices[0].message.content

def generate_image(prompt):
    """Generate an image using DALL-E."""
    client = get_openai_client()
    
    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )
    
    return response.data[0].url

def main():
    print("🤖 OpenAI API Examples")
    print("=" * 40)
    
    # Test chat completion
    print("\n1. Chat Completion Example:")
    try:
        response = chat_with_gpt("Explain quantum computing in simple terms.")
        print(f"Response: {response}")
    except Exception as e:
        print(f"Error: {e}")
    
    # Test image generation
    print("\n2. Image Generation Example:")
    try:
        image_url = generate_image("A cute robot reading a book in a library")
        print(f"Generated image URL: {image_url}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
