import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../service/post-service';
import { isAuthenticated } from '../../service/user-service';
import Navbar from '../Home/Navbar';

export default function CreatePost() {

    const navigate = useNavigate();
    useEffect(() => {
        const check = async () => {
            const isAuth = await isAuthenticated();
            if (!isAuth) {
                navigate('/Entry');
            }
        }
        check();
    },[]);

    const [post, setPost] = useState({
        title: '',
        category: 'suggestion',
        body: '',
    });

    const [tags, setTags] = useState([])
    const [tag, setTag] = useState('');

    const [selectedImages, setSelectedImages] = useState({});

    const [images, setImages] = useState([]);

    const handleInputs = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const handleTag = (e) => {
        setTag(e.target.value);
    }

    const addTag = (e) => {
        e.preventDefault();
        if (tag.length > 0) {
            setTags([...tags, tag]);
            setTag('');
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && tag.length > 0) {
            setTags([...tags, tag]);
            setTag('');
        }
    }

    const deleteTag = (index) => {
        const newTags = tags.filter((value, _index) => {
            return _index !== index;
        })
        setTags(newTags);
    }

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImages(e.target.files);

            let len = Object.keys(e.target.files).length;
            console.log(len);
            const newImages = [];
            for (let i = 0; i < len; i++) {
                newImages.push(URL.createObjectURL(e.target.files[`${i}`]));
            }
            setImages(newImages);
        }
        else {
            setImages([]);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await createPost({ post, tags, selectedImages });
    }

    return (
        <>
            <Navbar />
            <div className='container my-5 px-5'>
                <form encType='multipart/form-data'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label .form-inline">Title</label>
                        <input type="text" className="form-control .form-inline"
                            id="title"
                            placeholder='title'
                            name="title"
                            value={post.title}
                            onChange={handleInputs}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='category' className='form-label form-inline'>Select Category</label>
                        <select className='mx-3' id='category' name='category' onChange={handleInputs} required>
                            <option value="suggestion">Suggestion</option>
                            <option value="query">Query</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='tag' className='mb-3'>Enter Tags</label>
                        <input type='text' className='form-control form-inline'
                            id='tag' name='tag' value={tag} onChange={handleTag}
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={addTag}>add tag</button>
                    </div>

                    <div className='mb-3'>
                        {
                            tags.length > 0 ? <p>click on the tag to delete tag</p> : ''
                        }

                        {
                            tags.map((value, index) => {
                                return (
                                    <>
                                        <span style={{ cursor: 'pointer' }} className='px-2 py-1 tag'
                                            key={index} onClick={() => { deleteTag(index) }}>{value}</span>
                                    </>
                                )
                            })
                        }
                    </div>

                    <div>
                        <textarea className="form-control"
                            id="body"
                            placeholder='body'
                            name="body"
                            value={post.body}
                            onChange={handleInputs}
                        />
                    </div>

                    <div className='mt-3'>
                        <input type='file' id='photos' multiple='multiple'
                            accept="image/*"
                            max={10}
                            name='photos'
                            onChange={handleFileInput}
                        />
                    </div>
                    <div className="d-grid gap-2">
                        <input type='submit' className="btn btn-outline-primary" onClick={onSubmit} />
                    </div>
                </form>
                <div className='my-5'>
                    {
                        images.map((value, index) => {
                            return (
                                <>
                                    <img src={`${value}`}
                                        className="img-thumbnail rounded mx-auto d-block"
                                        style={{ height: '200px' }} />
                                </>
                            )
                        })
                    }
                </div>

            </div>
        </>
    )
}
