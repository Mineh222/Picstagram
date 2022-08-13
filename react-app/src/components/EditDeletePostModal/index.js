import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { thunkGetSinglePost, thunkDeletePost } from '../../store/posts';
import { thunkGetAllPostComments } from '../../store/comments';
import { useParams, useHistory } from 'react-router-dom';

import UpdatePostForm from '../UpdatePostForm';
import Modal from 'react-modal';

export default function EditDeletePostModal({postId, sessionUser, post, setShowEditDeleteModal}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showUpdatePostForm, setShowUpdatePostForm ] = useState(false);

    const onDelete = async (e) => {
        await dispatch(thunkDeletePost(postId))
        history.push(`/${sessionUser.username}`)
    }

    function openUpdatePostForm() {
        setShowUpdatePostForm(true)
    }

    const formStyles2 = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            minHeight: '100%',
            padding: '12px',
            backgroundColor: 'rgba(34, 34, 34, 0)'
        },
        content: {
            position: 'relative',
            margin: 'auto',
            maxWidth: '700px',
            height: '500px',
            width: '100%',
            top: '50px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '5px',
            outline: 'none',
            padding: '18px',
            paddingTop: '0px',
            paddingLeft: '0px',
            paddingBottom: '0px',
            paddingRight: '0px',
            overflow: 'visibile'
        }
    }


    return (
        <div id="post-buttons">
            <div id="delete-post-container">
                <button id="delete-post-btn" onClick={onDelete}>Delete</button>
            </div>
            <div id="edit-post-btn-container">
                <button id="edit-post-btn" onClick={openUpdatePostForm}>Edit</button>
            </div>
            <Modal isOpen={showUpdatePostForm} style={formStyles2}>
                <UpdatePostForm post={post} setTriggerUpdatePost={setShowUpdatePostForm} setTriggerEditDeleteModal={setShowEditDeleteModal}/>
            </Modal>
        </div>
        )
    }
