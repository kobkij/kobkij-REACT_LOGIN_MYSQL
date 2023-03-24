import React, { useState } from 'react'
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import {Link} from "react-router-dom";
 
const Register = () => {
    const [user_name, setUser_Name] = useState('');
    const [password_, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [name, setName] = useState('');
    const [last_name, setLast_Name] = useState('');
    const [position, setPosition] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate ();
 
    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                user_name: user_name,
                password_: password_,
                confPassword: confPassword,
                name : name,
                last_name : last_name,
                position : position
            });
            navigate("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
 
    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Register} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">
                                    <label className="label">User Name</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="User Name"
                                            value={user_name} onChange={(e) => setUser_Name(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password_} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Confirm Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <hr />
                                </div>
                                <div className="field mt-5">
                                    <label class="label">ข้อมูลส่วนตัว</label>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">ชื่อ</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Name"
                                            value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">นามสกุล</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Last Name"
                                            value={last_name} onChange={(e) => setLast_Name(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">ตำแหน่ง</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Position"
                                            value={position} onChange={(e) => setPosition(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Register</button>
                                </div>
                                <div className="field mt-5">
                                    <Link to="/"><button className="button is-info is-fullwidth">Back</button></Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
 
export default Register