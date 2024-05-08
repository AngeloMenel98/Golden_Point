import { TextSpan } from "./CopyableTextStyle";

interface CopyableTextProps {
  text: string;
}

const CopyableText: React.FC<CopyableTextProps> = ({ text }) => {
  const handleCopyToClipboard = async (textToCopy: string) => {
    await navigator.clipboard.writeText(textToCopy);
  };

  return (
    <TextSpan onClick={() => handleCopyToClipboard(text)}>{text}</TextSpan>
  );
};

export default CopyableText;
