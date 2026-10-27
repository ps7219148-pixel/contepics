// ContepicS - Interactive Features

function showMessage(toolName) {
    alert(
        toolName +
        " is coming soon!\n\n" +
        "We're working to bring you useful, free YouTube creator tools."
    );
}

// Open the title generator.
function openTitleGenerator() {
    document.getElementById("title-generator").scrollIntoView({
        behavior: "smooth"
    });

    document.getElementById("video-topic").focus();
}

// Clean up the topic.
function cleanTopic(topic) {
    return topic
        .trim()
        .replace(/\s+/g, " ")
        .replace(/[.!?]+$/, "");
}

// Capitalize the first letter of each word.
function titleCase(text) {
    return text.replace(/\b\w/g, function (letter) {
        return letter.toUpperCase();
    });
}

// Generate title suggestions.
function generateTitles(topic, category) {
    const clean = cleanTopic(topic);
    const lower = clean.toLowerCase();

    // Special title patterns for YouTube growth topics.
    if (
        lower.includes("grow") &&
        (lower.includes("youtube") || lower.includes("channel"))
    ) {
        return [
            "How to Grow a YouTube Channel From Zero",
            "7 Mistakes Keeping Your YouTube Channel Small",
            "How to Get Your First 1,000 YouTube Subscribers",
            "YouTube Growth Strategies Every Beginner Should Know",
            "How to Grow on YouTube Without Showing Your Face"
        ];
    }

    // General title patterns for other topics.
    const topicTitle = titleCase(clean);

    const templates = {
        general: [
            `${topicTitle}: A Beginner's Guide`,
            `5 Things to Know About ${topicTitle}`,
            `The Truth About ${topicTitle}`,
            `${topicTitle}: What Nobody Tells You`,
            `Is ${topicTitle} Worth Your Time?`
        ],

        education: [
            `Learn ${topicTitle} Step by Step`,
            `${topicTitle} Explained for Beginners`,
            `5 Important Lessons About ${topicTitle}`,
            `Common Mistakes to Avoid With ${topicTitle}`,
            `Everything You Need to Know About ${topicTitle}`
        ],

        gaming: [
            `${topicTitle}: Tips Every Gamer Should Know`,
            `How to Get Better at ${topicTitle}`,
            `${topicTitle}: Beginner to Pro Guide`,
            `5 Mistakes Gamers Make With ${topicTitle}`,
            `Can You Master ${topicTitle}?`
        ],

        music: [
            `${topicTitle}: The Story Behind the Music`,
            `Why ${topicTitle} Is Worth Listening To`,
            `${topicTitle}: First Impressions and Review`,
            `What Makes ${topicTitle} Stand Out?`,
            `Everything You Should Know About ${topicTitle}`
        ],

        technology: [
            `${topicTitle}: Is It Worth It?`,
            `${topicTitle} Explained Simply`,
            `5 Things to Know Before Using ${topicTitle}`,
            `${topicTitle}: Tips and Tricks`,
            `The Pros and Cons of ${topicTitle}`
        ],

        entertainment: [
            `Why Everyone Is Talking About ${topicTitle}`,
            `${topicTitle}: Everything You Missed`,
            `The Truth Behind ${topicTitle}`,
            `What Makes ${topicTitle} So Interesting?`,
            `${topicTitle}: My Honest Take`
        ],

        vlog: [
            `A Day in My Life: ${topicTitle}`,
            `Come With Me for ${topicTitle}`,
            `My Experience With ${topicTitle}`,
            `What Happened During ${topicTitle}?`,
            `An Honest Look at ${topicTitle}`
        ]
    };

    return templates[category] || templates.general;
}

// Main generator function.
function generateContent() {
    const topicInput = document.getElementById("video-topic");
    const categoryInput = document.getElementById("video-category");
    const errorMessage = document.getElementById("generator-error");
    const results = document.getElementById("generator-results");
    const titleList = document.getElementById("title-results");
    const descriptionBox = document.getElementById("description-result");

    const rawTopic = topicInput.value.trim();
    const category = categoryInput.value;

    errorMessage.textContent = "";
    results.hidden = true;

    if (rawTopic.length < 3) {
        errorMessage.textContent =
            "Please enter a topic with at least 3 characters.";
        topicInput.focus();
        return;
    }

    if (rawTopic.length > 150) {
        errorMessage.textContent =
            "Please keep your topic under 150 characters.";
        topicInput.focus();
        return;
    }

    const titles = generateTitles(rawTopic, category);

    // Clear old titles.
    titleList.replaceChildren();

    // Display each title with its own copy button.
    titles.forEach(function (title) {
        const item = document.createElement("li");
        const titleText = document.createElement("span");
        const copyButton = document.createElement("button");

        titleText.textContent = title;

        copyButton.textContent = "Copy";
        copyButton.type = "button";
        copyButton.className = "copy-title-button";

        copyButton.addEventListener("click", function () {
            copyText(title, copyButton);
        });

        item.appendChild(titleText);
        item.appendChild(copyButton);

        titleList.appendChild(item);
    });

    // Create the description.
    const categoryLabels = {
        general: "video",
        education: "educational video",
        gaming: "gaming video",
        music: "music video",
        technology: "technology video",
        entertainment: "entertainment video",
        vlog: "vlog"
    };

    const label = categoryLabels[category] || "video";

    descriptionBox.value =
        `In this ${label}, we explore ${rawTopic} and share ` +
        `useful information to help you understand the topic.\n\n` +
        `Watch until the end and share your thoughts in the comments.\n\n` +
        `If you enjoyed this video, consider liking it and subscribing ` +
        `for more content.\n\n` +
        `#YouTube #${makeHashtag(rawTopic)}`;

    results.hidden = false;
}

// Create a hashtag from the topic.
function makeHashtag(topic) {
    return topic
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .trim()
        .split(/\s+/)
        .slice(0, 3)
        .join("");
}

// Copy text to the clipboard.
async function copyText(text, button) {
    try {
        await navigator.clipboard.writeText(text);
        button.textContent = "Copied!";
    } catch (error) {
        // Fallback for browsers where clipboard access is unavailable.
        const temporaryInput = document.createElement("textarea");
        temporaryInput.value = text;
        temporaryInput.style.position = "fixed";
        temporaryInput.style.opacity = "0";

        document.body.appendChild(temporaryInput);
        temporaryInput.select();

        const success = document.execCommand("copy");
        temporaryInput.remove();

        button.textContent = success ? "Copied!" : "Copy manually";
    }

    setTimeout(function () {
        button.textContent = "Copy";
    }, 2000);
}

// Copy the complete description.
function copyDescription() {
    const descriptionBox =
        document.getElementById("description-result");

    const copyButton = document.querySelector(".copy-button");

    copyText(descriptionBox.value, copyButton);
}

console.log("ContepicS website loaded successfully!");
// ContepicS - Video Idea Generator

function generateVideoIdeas() {
    const nicheInput = document.getElementById("idea-niche");
    const formatInput = document.getElementById("idea-format");
    const errorMessage = document.getElementById("idea-error");
    const results = document.getElementById("idea-results");
    const ideaList = document.getElementById("idea-list");

    const niche = nicheInput.value.trim();
    const format = formatInput.value;

    errorMessage.textContent = "";
    results.hidden = true;

    if (niche.length < 2) {
        errorMessage.textContent =
            "Please enter your channel topic first.";
        nicheInput.focus();
        return;
    }

    if (niche.length > 80) {
        errorMessage.textContent =
            "Please keep your channel topic under 80 characters.";
        nicheInput.focus();
        return;
    }

    const topic = niche.charAt(0).toUpperCase() + niche.slice(1);

    let ideas;

    if (format === "shorts") {
        ideas = [
            `3 Things Every Beginner Should Know About ${topic}`,
            `The Biggest Mistake People Make With ${topic}`,
            `One Surprising Fact About ${topic}`,
            `Stop Doing This If You Care About ${topic}`,
            `5 Quick Tips to Improve at ${topic}`,
            `What Nobody Tells You About ${topic}`,
            `Can You Learn ${topic} in 30 Seconds?`,
            `3 Common Myths About ${topic}`,
            `One Simple Trick to Get Better at ${topic}`,
            `Before You Try ${topic}, Watch This`
        ];
    } else {
        ideas = [
            `The Complete Beginner's Guide to ${topic}`,
            `10 Mistakes to Avoid When Learning ${topic}`,
            `I Tried ${topic}: Here's What I Learned`,
            `Everything You Need to Know About ${topic}`,
            `7 Tips That Can Help You Improve at ${topic}`,
            `The Truth About ${topic}: What Beginners Should Know`,
            `A Step-by-Step Guide to Understanding ${topic}`,
            `The Biggest Challenges Beginners Face With ${topic}`,
            `What I Wish I Knew Before Starting ${topic}`,
            `Is ${topic} Worth Your Time? An Honest Look`
        ];
    }

    ideaList.replaceChildren();

    ideas.forEach(function (idea) {
        const item = document.createElement("li");
        const text = document.createElement("span");
        const copyButton = document.createElement("button");

        text.textContent = idea;

        copyButton.textContent = "Copy";
        copyButton.type = "button";
        copyButton.className = "copy-title-button";

        copyButton.addEventListener("click", function () {
            copyText(idea, copyButton);
        });

        item.appendChild(text);
        item.appendChild(copyButton);

        ideaList.appendChild(item);
    });

    results.hidden = false;
}

// ContepicS - Video Idea Generator

function generateVideoIdeas() {
    const nicheInput = document.getElementById("idea-niche");
    const formatInput = document.getElementById("idea-format");
    const errorMessage = document.getElementById("idea-error");
    const results = document.getElementById("idea-results");
    const ideaList = document.getElementById("idea-list");

    const niche = nicheInput.value.trim();
    const format = formatInput.value;

    errorMessage.textContent = "";
    results.hidden = true;

    if (niche.length < 2) {
        errorMessage.textContent =
            "Please enter your channel topic first.";
        nicheInput.focus();
        return;
    }

    if (niche.length > 80) {
        errorMessage.textContent =
            "Please keep your topic under 80 characters.";
        nicheInput.focus();
        return;
    }

    const topic = niche.charAt(0).toUpperCase() + niche.slice(1);

    let ideas;

    if (format === "shorts") {
        ideas = [
            `3 Things Every Beginner Should Know About ${topic}`,
            `The Biggest Mistake People Make With ${topic}`,
            `One Surprising Fact About ${topic}`,
            `Stop Doing This If You Care About ${topic}`,
            `5 Quick Tips to Improve at ${topic}`,
            `What Nobody Tells You About ${topic}`,
            `Can You Learn ${topic} in 30 Seconds?`,
            `3 Common Myths About ${topic}`,
            `One Simple Trick to Get Better at ${topic}`,
            `Before You Try ${topic}, Watch This`
        ];
    } else {
        ideas = [
            `The Complete Beginner's Guide to ${topic}`,
            `10 Mistakes to Avoid When Learning ${topic}`,
            `I Tried ${topic}: Here's What I Learned`,
            `Everything You Need to Know About ${topic}`,
            `7 Tips That Can Help You Improve at ${topic}`,
            `The Truth About ${topic}: What Beginners Should Know`,
            `A Step-by-Step Guide to Understanding ${topic}`,
            `The Biggest Challenges Beginners Face With ${topic}`,
            `What I Wish I Knew Before Starting ${topic}`,
            `Is ${topic} Worth Your Time?`
        ];
    }

    ideaList.replaceChildren();

    ideas.forEach(function (idea) {
        const item = document.createElement("li");
        const text = document.createElement("span");
        const copyButton = document.createElement("button");

        text.textContent = idea;
        copyButton.textContent = "Copy";
        copyButton.type = "button";
        copyButton.className = "copy-title-button";

        copyButton.addEventListener("click", function () {
            copyText(idea, copyButton);
        });

        item.appendChild(text);
        item.appendChild(copyButton);
        ideaList.appendChild(item);
    });

    results.hidden = false;
}

// ContepicS - Thumbnail Resizer

let resizedThumbnailUrl = null;

function resizeThumbnail() {
    const fileInput = document.getElementById("thumbnail-upload");
    const errorMessage = document.getElementById("thumbnail-error");
    const previewContainer = document.getElementById("thumbnail-preview-container");
    const preview = document.getElementById("thumbnail-preview");
    const dimensions = document.getElementById("thumbnail-dimensions");
    const downloadButton = document.getElementById("download-thumbnail");

    errorMessage.textContent = "";
    downloadButton.hidden = true;

    const file = fileInput.files[0];

    if (!file) {
        errorMessage.textContent = "Please choose an image first.";
        return;
    }

    if (!file.type.startsWith("image/")) {
        errorMessage.textContent = "Please select a valid image file.";
        return;
    }

    if (file.size > 15 * 1024 * 1024) {
        errorMessage.textContent = "Please choose an image smaller than 15 MB.";
        return;
    }

    const image = new Image();
    const imageUrl = URL.createObjectURL(file);

    image.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = 1280;
        canvas.height = 720;

        const context = canvas.getContext("2d");

        // Fill the background to avoid transparent areas.
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Fit the whole image inside 1280 × 720 without cropping.
        const scale = Math.min(
            canvas.width / image.width,
            canvas.height / image.height
        );

        const width = image.width * scale;
        const height = image.height * scale;
        const x = (canvas.width - width) / 2;
        const y = (canvas.height - height) / 2;

        context.drawImage(image, x, y, width, height);

        canvas.toBlob(function (blob) {
            URL.revokeObjectURL(imageUrl);

            if (!blob) {
                errorMessage.textContent =
                    "Sorry, the image could not be resized. Try another image.";
                return;
            }

            if (resizedThumbnailUrl) {
                URL.revokeObjectURL(resizedThumbnailUrl);
            }

            resizedThumbnailUrl = URL.createObjectURL(blob);

            preview.src = resizedThumbnailUrl;
            dimensions.textContent = "Output size: 1280 × 720 pixels";
            previewContainer.hidden = false;
            downloadButton.hidden = false;
        }, "image/jpeg", 0.92);
    };

    image.onerror = function () {
        URL.revokeObjectURL(imageUrl);
        errorMessage.textContent =
            "The image could not be opened. Please try another file.";
    };

    image.src = imageUrl;
}

function downloadThumbnail() {
    if (!resizedThumbnailUrl) {
        return;
    }

    const link = document.createElement("a");
    link.href = resizedThumbnailUrl;
    link.download = "contepicS-youtube-thumbnail.jpg";

    document.body.appendChild(link);
    link.click();
    link.remove();
}

// Show the resize button when an image is selected
document.getElementById("thumbnail-upload").addEventListener("change", function () {
    const container = document.getElementById("thumbnail-preview-container");
    const errorMessage = document.getElementById("thumbnail-error");
    const downloadButton = document.getElementById("download-thumbnail");
    const preview = document.getElementById("thumbnail-preview");
    const dimensions = document.getElementById("thumbnail-dimensions");

    errorMessage.textContent = "";

    if (this.files.length > 0) {
        container.hidden = false;
        downloadButton.hidden = true;
        preview.removeAttribute("src");
        dimensions.textContent = "";
    }
});