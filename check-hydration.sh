#!/bin/bash
# Find all potential hydration error sources

echo "=== Checking for hydration error sources ===" echo ""

echo "1. Direct new Date() calls in component body:"
grep -rn "new Date()" components/ app/ --include="*.tsx" --include="*.ts" | grep -v "node_modules" | grep -v ".next"

echo ""
echo "2. Math.random() in component body:"
grep -rn "Math.random()" components/ app/ --include="*.tsx" | grep -v "node_modules"

echo ""
echo "3. window/localStorage in component body (not in useEffect):"
grep -rn "window\.|localStorage\.|sessionStorage\." components/ app/ --include="*.tsx" | grep -v "useEffect" | grep -v "node_modules" | grep -v "typeof window"

echo ""
echo "=== Done ==="
