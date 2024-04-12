import { IMessage } from "@/store/chat-store";


type ChatBubbleProps = {
	message: IMessage;
	me: any;
};
const ChatBubble = ({me, message}: ChatBubbleProps) => {
	return <div>ChatBubble</div>;
};
export default ChatBubble;