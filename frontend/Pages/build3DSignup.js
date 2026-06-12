const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\Users\\Test\\Downloads\\Shughosha\\frontend\\Pages',
    'c:\\Users\\Test\\OneDrive\\Documents\\Shughosha\\frontend\\Pages'
];

const threeJSHTML = `
    <!-- Three.js 3D WebGL Library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    
    <!-- The WebGL Canvas Container -->
    <div id="webgl-container" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 0; pointer-events: none;"></div>

    <script>
        // === HIGH-END THREE.JS LIQUID GLASS OCEAN SCENE ===
        
        const container = document.getElementById('webgl-container');
        const scene = new THREE.Scene();
        // Base fog to blend edges cleanly with background
        scene.fog = new THREE.FogExp2(0x050508, 0.015);

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 30, 60);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize for high-DPI screens without lag
        container.appendChild(renderer.domElement);

        // 1. The 3D Glass Surface Grid
        const geometry = new THREE.PlaneGeometry(300, 300, 100, 100);
        
        // Advanced MeshPhysicalMaterial for refraction/glass feel
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x050508,
            emissive: 0x011a24,
            roughness: 0.15,
            metalness: 0.8,
            reflectivity: 1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            wireframe: true, // Wireframe gives that true tech/spline wireframe feel
            transparent: true,
            opacity: 0.6
        });

        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -10;
        scene.add(plane);

        const pointsMat = new THREE.PointsMaterial({
            color: 0x48b0d6,
            size: 0.5,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        const particles = new THREE.Points(geometry, pointsMat);
        particles.rotation.x = -Math.PI / 2;
        particles.position.y = -10;
        scene.add(particles);


        // 2. Dynamic Cinematic Lighting (Cyan, Purple, Firey Orange)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);

        const cyanLight = new THREE.PointLight(0x48b0d6, 5, 150);
        cyanLight.position.set(40, 20, 20);
        scene.add(cyanLight);

        const purpleLight = new THREE.PointLight(0x8b5cf6, 4, 150);
        purpleLight.position.set(-40, 10, -20);
        scene.add(purpleLight);

        const fireOrangeLight = new THREE.PointLight(0xea580c, 6, 200); 
        fireOrangeLight.position.set(0, -10, 0); 
        scene.add(fireOrangeLight);

        // 3. Mouse Interaction Math
        let mouseX = 0; let mouseY = 0;
        let targetX = 0; let targetY = 0;
        let time = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // The exact center position of the grid
        const positionAttribute = geometry.attributes.position;
        const initialZ = new Float32Array(positionAttribute.count);
        for(let i=0; i<positionAttribute.count; i++) {
             initialZ[i] = positionAttribute.getZ(i);
        }

        // 4. The 60FPS Fluid Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            time += 0.03;

            // Smoothly move mouse target
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            // Simulate the "Water Drops" falling on the surface
            for (let i = 0; i < positionAttribute.count; i++) {
                const x = positionAttribute.getX(i);
                const y = positionAttribute.getY(i); 

                let z = Math.sin(x * 0.05 + time) * 3 + Math.cos(y * 0.05 + time) * 3;

                const planeMouseX = targetX * 100;
                const planeMouseY = targetY * 100;
                const distToMouse = Math.sqrt(Math.pow(x - planeMouseX, 2) + Math.pow(y - planeMouseY, 2));
                
                const ripple = Math.sin(distToMouse * 0.2 - time * 5) * 15;
                const falloff = Math.max(0, 1 - (distToMouse / 60)); 
                
                z += ripple * falloff;
                positionAttribute.setZ(i, z);
            }
            positionAttribute.needsUpdate = true;

            // Smooth Camera Parallax Drift
            camera.position.x += (targetX * 30 - camera.position.x) * 0.02;
            camera.position.z += (60 + targetY * -20 - camera.position.z) * 0.02;
            camera.lookAt(0, 5, 0);

            // Pulse the orange fiery light under the water core
            fireOrangeLight.intensity = 5 + Math.sin(time * 2) * 3;

            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Trigger the signup card entering
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                const c = document.getElementById('signup-card');
                if (c) { 
                    c.classList.remove('opacity-0', 'translate-y-8');
                    c.classList.add('opacity-100', 'translate-y-0');
                }
            }, 100);
        });
    </script>
`;

for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;

    const filePath = path.join(dir, 'signup.html');
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Delete the entire galaxy-bg section
        content = content.replace(/<div id="galaxy-bg" class="galaxy-background">[\s\S]*?<\/div>\s*<\/div>/, '');

        // Remove the associated galaxy CSS
        content = content.replace(/\/\* =========================================[\s\S]*?\/\* =========================================[\s\S]*?========================================= \*\//, '');

        // Inject the Three.js block right after the body tag opens
        content = content.replace(/<body[^>]*>/i, (match) => match + '\n\n' + threeJSHTML);

        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Successfully injected Three.js into', filePath);
    }
}
