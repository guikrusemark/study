#!/usr/bin/env python
"""Start the Flask development server."""

from src.app import create_app

if __name__ == "__main__":
    app = create_app("development")
    print("Starting Flask API server...")
    print("API available at: http://localhost:5000")
    print("Endpoints:")
    print("  - GET  /              - Root endpoint")
    print("  - GET  /health        - Health check")
    print("  - GET  /api/users     - Get all users")
    print("  - POST /api/users     - Create user")
    print("  - GET  /api/persons   - Get all persons")
    print("  - POST /api/persons   - Create person")
    app.run(debug=True, host="0.0.0.0", port=5000)
