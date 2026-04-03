/**
 * SplitText Animation Utility
 * Mimics the 'SplitText' effect from premium libraries like React Bits.
 */
export function initSplitText(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
        const text = element.innerText;
        element.innerHTML = '';
        element.style.opacity = '1'; // Ensure container is visible

        // Split into characters
        const chars = text.split('');

        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(1.5rem) scale(0.8)';
            span.style.filter = 'blur(4px)';
            span.style.transition = `
        opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.04}s,
        transform 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.04}s,
        filter 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.04}s
      `;

            element.appendChild(span);

            // Trigger animation after a tiny delay
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0) scale(1)';
                span.style.filter = 'blur(0px)';
            }, 50);
        });
    });
}
