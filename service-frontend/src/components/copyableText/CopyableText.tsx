import { useState } from "react";
import { TextSpan } from "./CopyableTextStyle";
import CopyIcon from "../../icons/CopyIcon/CopyIcon";
import { darkGreen } from "../../utils/colors";

interface CopyableTextProps {
  text: string;
}

const CopyableText: React.FC<CopyableTextProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = async (textToCopy: string) => {
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <TextSpan onClick={() => handleCopyToClipboard(text)}>
      {text}
      {copied && <CopyIcon width={15} height={18} color={darkGreen} />}
    </TextSpan>
  );
};

export default CopyableText;
