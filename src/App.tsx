import { useEffect, useState } from 'react';
import './App.css';
import { Note } from './Note';
import NoteEditor from './NoteEditor';
import NoteList from './NoteList';
import { supabase } from './supabase/client';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState<number | null>(null);

  useEffect(() => {
    fetchNotes();
    const mySubscription = supabase
      .channel('note')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'note'
        },
        fetchNotes
      )
      .subscribe();

    return () => {
      supabase.removeChannel(mySubscription);
    };
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('note')
      .select('*')
      .order("id", { ascending: false });
    if (error) {
      console.error("Error fetching notes:", error);
    } else {
      setNotes(data);
    }
  };

  const handleNewNote = async () => {
    const { data, error } = await supabase
      .from('note')
      .insert({ title: '新規ノート', content: '' })
    if (error || data) {
      console.error(error);
      return;
    } else {
      fetchNotes();
    }
  };

  const handleContentChange = async (content: string) => {
    const { error } = await supabase
      .from('note')
      .update({ content })
      .eq('id', currentNoteId);
    if (error) {
      console.error("Error updating note", error);
      return;
    } else {
      fetchNotes();
    }
  };

  const handleChangeTitle = async (title: string) => {
    const { error } = await supabase
      .from('note')
      .update({ title })
      .eq('id', currentNoteId);
    if (error) {
      console.error("Error updating note", error);
      return;
    }
  };

  const handleDeleteNote = async (id: number) => {
    const { error } = await supabase
      .from('note')
      .delete()
      .eq('id', id);
    if (error) {
      console.error("Error deleting note", error);
      return;
    }
    fetchNotes();
  };

  return (
    <div className="flex h-screen">
      <div className="w-[300px] bg-gray-100 p-4">
        <div className="mb-4">
          <button
            className="w-full p-2 bg-blue-500 text-white font-bold rounded"
            onClick={handleNewNote}
          >
            新規作成
          </button>
        </div>
        <NoteList
          notes={notes}
          selectNoteId={currentNoteId}
          onSelect={(note) => setCurrentNoteId(note.id)}
          handleChangeTitle={handleChangeTitle}
          handleDeleteNote={handleDeleteNote}
        />
      </div>
      <div className="flex-1 p-4">
        <div className='mb-4 flex justify-between'>
          <h2 className='text-xl font-bold'>Note Editor</h2>
          <button className='p-2 bg-green-500 text-white font-bold rounded'
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? 'Edit' : 'Preview'}
          </button>
        </div>
        <NoteEditor
          content={notes.find(note => note.id === currentNoteId)?.content || ''}
          isPreviewMode={previewMode}
          onContentChange={handleContentChange} />
      </div>
    </div >
  );
}

export default App;
