import React from "react";

interface YouTubeEmbedProps {
  channelId: string;
  width?: string;
  height?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  channelId,
  width = "100%",
  height = "600px",
}) => {
  // Tự tính playlistId
  const playlistId = `UU${channelId.slice(2)}`;
  const src = `https://www.youtube.com/embed?listType=playlist&list=${playlistId}`;

  return (
    <div style={{ overflow: "hidden", width, height, border: "1px solid #ccc", borderRadius: "8px" }}>
      <iframe
        width="100%"
        height="100%"
        src={src}
        title="YouTube Channel Uploads"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};


export default YouTubeEmbed;
