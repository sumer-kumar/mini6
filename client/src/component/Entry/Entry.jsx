import React from 'react'
import { Link } from 'react-router-dom'

export default function Entry() {
    return (
        <div className="container my-5">
            <h1 className='text-center'>Qombo</h1>
            <div class="text-center">
                <Link className="no-link" to='/login'>
                    <button type="button" className="btn btn-primary btn-lg m-3 btn-block">
                        Login
                    </button>
                </Link>
                <br />
                <Link className="no-link" to='/create/user'>
                    <button type="button" className="btn btn-danger btn-lg m-3 btn-block">
                        SIGN UP
                    </button>
                </Link>
            </div>
        </div>
    )
}
