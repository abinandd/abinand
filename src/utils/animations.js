/**
 * SplitText Animation Utility
 * Mimics Premium character reveals.
 */
export function initSplitText(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
        const text = element.innerText;
        element.innerHTML = '';
        element.style.opacity = '1';

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
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0) scale(1)';
                span.style.filter = 'blur(0px)';
            }, 50);
        });
    });
}

/**
 * Simple Fade Reveal
 * Cleanly reveals paragraphs word-by-word with a gentle fade, no blurs or complex transforms.
 */
export function initSimpleReveal(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(container => {
        const text = container.innerText;
        container.innerHTML = '';

        // Use an actual space character between spans to handle layout naturally
        const words = text.split(/\s+/);
        const spans = words.map((word, i) => {
            const span = document.createElement('span');
            span.textContent = word;
            span.style.display = 'inline-block';
            span.style.marginRight = '0.25em'; // Clean spacing
            span.style.opacity = '0';
            span.style.transition = `opacity 0.8s ease-out ${i * 0.03}s`;
            container.appendChild(span);
            return span;
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    spans.forEach(span => span.style.opacity = '1');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(container);
    });
}
