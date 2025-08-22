#!/bin/bash

echo "🚀 Building Sugar Codex for web deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
bun install

# Build for web
echo "🔨 Building for web..."
bunx expo export --platform web

# Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Build successful! Files are in the 'dist' directory."
    echo ""
    echo "📁 Build output:"
    ls -la dist/
    echo ""
    echo "🌐 To test locally, run:"
    echo "   npx serve dist"
    echo ""
    echo "📤 To deploy to GitHub Pages:"
    echo "   1. Push your changes to the main branch"
    echo "   2. Go to your GitHub repository"
    echo "   3. Navigate to Settings > Pages"
    echo "   4. Set source to 'GitHub Actions'"
    echo "   5. The workflow will automatically deploy your app"
else
    echo "❌ Build failed. Check the error messages above."
    exit 1
fi