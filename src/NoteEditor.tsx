interface Props {
  content: string;
}

const NoteEditor: React.FC<Props> = ({ content }) => {
  return (
    <textarea
      className="w-full h-[500px] p-2 border border-gray-300 rounded"
      value={content}
    />
  );
};

export default NoteEditor;
