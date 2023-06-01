import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import {addNoteToDB} from '../../queries/notesQuery';
import {addNote} from '../../redux/features/notesSlice';

const Notes = () => {
  const dispatch = useDispatch();
  const {allNotes} = useSelector(state => state.notes);

  const [notes, setNotes] = useState({
    noteTitle: '',
    noteDescription: '',
  });
  const {noteTitle, noteDescription} = notes;

  const onChangeTextHandler = (fieldName, value) => {
    setNotes({
      ...notes,
      [fieldName]: value,
    });
  };

  const addNoteHandler = () => {
    if (noteTitle.length !== 0 && noteDescription.length !== 0) {
      const note = {...notes, noteId: Math.floor(Math.random() * 1000000)};
      addNoteToDB(note)
        .then(() => {
          console.log('note added to db');
          dispatch(addNote(note)); // dispatching to redux
          setNotes({
            noteTitle: '',
            noteDescription: '',
          });
        })
        .catch(error => console.error('error adding note to db', error));
    }
  };

  return (
    <View style={styles.mainWrapper}>
      <TextInput
        label="Note Ttile"
        placeholder="Note title goes here..."
        mode="outlined"
        style={styles.input}
        outlineColor="#000"
        activeOutlineColor="#273a94"
        maxLength={50}
        value={noteTitle}
        left={<TextInput.Icon icon="notebook" />}
        onChangeText={value => onChangeTextHandler('noteTitle', value)}
      />

      <TextInput
        label="Note Description"
        placeholder="Your note description goes here..."
        mode="outlined"
        style={styles.input}
        outlineColor="#000"
        activeOutlineColor="#273a94"
        multiline={true}
        maxLength={500}
        value={noteDescription}
        left={<TextInput.Icon icon="notebook" />}
        onChangeText={value => onChangeTextHandler('noteDescription', value)}
      />

      <Button
        icon="notebook"
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabelStyle}
        onPress={addNoteHandler}>
        Add Note
      </Button>
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: '#fafafa',
    minHeight: '100%',
  },
  input: {
    margin: 10,
    color: '#000',
    backgroundColor: '#fafafa',
  },
  button: {
    borderRadius: 5,
    marginVertical: '2%',
    backgroundColor: '#273a94',
    width: '50%',
    alignSelf: 'center',
  },
  buttonLabelStyle: {
    color: '#fafafa',
  },
});
