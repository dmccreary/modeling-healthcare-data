// Let embedded MicroSims fit responsive content and expanded explanations.
// Match the sending frame, and accept only finite, bounded height values.
window.addEventListener("message", function (event) {
    const data = event.data;
    if (!data || data.type !== "microsim-resize" ||
        typeof data.height !== "number" || !Number.isFinite(data.height) ||
        data.height < 100 || data.height > 5000) return;
    for (const frame of document.querySelectorAll("iframe")) {
        if (frame.contentWindow === event.source) {
            const style = getComputedStyle(frame);
            const border = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
            const height = Math.ceil(data.height + border);
            frame.style.boxSizing = "border-box";
            frame.style.height = height + "px";
            frame.setAttribute("height", height);
            break;
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Find all admonitions with the "prompt" class
    document.querySelectorAll(".admonition.prompt").forEach((admonition) => {
        // Create a "Copy" button
        const copyButton = document.createElement("button");
        copyButton.textContent = "Copy";
        copyButton.className = "copy-button";

        // Append the button to the admonition
        admonition.appendChild(copyButton);

        // Add event listener for the button
        copyButton.addEventListener("click", () => {
            // Collect all text content inside the admonition except the title and button
            const promptText = Array.from(admonition.querySelectorAll("p:not(.admonition-title)"))
                .map((p) => p.textContent.trim())
                .join("\n");

            if (promptText) {
                // Copy the collected text to the clipboard
                navigator.clipboard.writeText(promptText).then(
                    () => {
                        // Show feedback on successful copy
                        copyButton.textContent = "Copied!";
                        setTimeout(() => (copyButton.textContent = "Copy"), 2000);
                    },
                    (err) => {
                        console.error("Failed to copy text: ", err);
                    }
                );
            } else {
                console.error("No prompt text found to copy.");
            }
        });
    });
});