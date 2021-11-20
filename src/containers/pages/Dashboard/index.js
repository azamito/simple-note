import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addDataToAPI, deleteDataFromAPI, getDataFromAPI, updateDataFromAPI } from '../../../config/redux/actions';

import './Dashboard.scss';

export class Dashboard extends Component {
  state = {
    title: '',
    content: '',
    date: '',
    textButton: 'simpan',
    noteId: '',
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    this.props.getNotes(userData.uid);
  }

  handleSaveNotes = () => {
    const { title, content, textButton, noteId } = this.state;
    const { saveNote, updateNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem('userData'));

    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid
    }

    if (textButton === 'simpan') {
      saveNote(data);
    } else {
      data.noteId = noteId;
      updateNotes(data);
    }
    console.log(data);
  }

  onInputChange = (e, type) => {
    this.setState({
      [type]: e.target.value
    })
  }

  updateNotes = (note) => {
    this.setState({
      textButton: 'update',
      title: note.data.title,
      content: note.data.content,
      noteId: note.id
    })
  }
  cancelUpdate = () => {
    this.setState({
      textButton: 'simpan',
      title: '',
      content: ''
    })
  }

  deleteNote = (e, note) => {
    e.stopPropagation();

    const userData = JSON.parse(localStorage.getItem('userData'));
    const data = {
      userId: userData.uid,
      noteId: note.id,
    }

    this.props.deleteNote(data);
  }

  render() {
    const { title, content, textButton } = this.state;
    const { notes } = this.props;
    const { onInputChange, handleSaveNotes, updateNotes, cancelUpdate, deleteNote } = this;
    console.log('notes: ', notes);

    return (
      <div className="container">
        <div className="input-form">
          <input placeholder="title" className="input-title" value={title} onChange={(e) => onInputChange(e, 'title')} />
          <textarea placeholder="content" className="input-content" value={content} onChange={(e) => onInputChange(e, 'content')}>

          </textarea>
          <div className="action-wrapper">
            {
              textButton === 'update' ? (
                <button className="save-btn cancel" onClick={cancelUpdate}>cancel</button>
              ) : <div />
            }
            <button className="save-btn" onClick={handleSaveNotes}>{textButton}</button>
          </div>
        </div>
        <hr />
        {
          notes.length > 0 ? (
            <Fragment>
              {
                notes.map(note => {
                  return (
                    <div className="card-content" key={note.id} onClick={() => updateNotes(note)}>
                      <p className="title">{note.data.title}</p>
                      <p className="date">{note.data.date}</p>
                      <p className="content">{note.data.content}</p>
                      <div className="btn-delete" onClick={(e) => deleteNote(e, note)}>x</div>
                    </div>
                  )
                })
              }
            </Fragment>
          ) : null
        }
      </div>
    )
  }
}
const reduxState = (state) => ({
  userData: state.user,
  notes: state.notes
})

const reduxDispatch = (dispatch) => ({
  saveNote: (data) => dispatch(addDataToAPI(data)),
  getNotes: (data) => dispatch(getDataFromAPI(data)),
  updateNotes: (data) => dispatch(updateDataFromAPI(data)),
  deleteNote: (data) => dispatch(deleteDataFromAPI(data))
})
export default connect(reduxState, reduxDispatch)(Dashboard);
