import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import useAxios from 'axios-hooks';
import Map from '../Partial/Map';

function AddAddress() {
    const notify = () => toast('');
    const [diadiem_ten, setDiadiem_ten] = useState("");
    const [diadiem_url, setDiadiem_url] = useState("");
    const [diadiem_kinhdo, setDiadiem_kinhdo] = useState(0);
    const [diadiem_vido, setDiadiem_vido] = useState(0);
    const [diadiem_mota, setDiadiem_mota] = useState("");
    const [danhmucId, setDanhmucId] = useState("");
    const navigate = useNavigate();
    const [hinhanh_url, setHinhAnhURL] = useState();
    var today = new Date();
    const [{ data: category, loading: cLoading, error: CError }] = useAxios(`Category`);
    const hinhanh = [{ hinhanh_mota: diadiem_ten, hinhanh_url }];

    async function add() {
        let danhmuc = {};
        for (let i = 0; i < category.length; i++) {
            if (category[i].id_danhmuc == danhmucId) {
                danhmuc = { id_danhmuc: danhmucId, danhmuc_ten: category[i].danhmuc_ten }
            }
        }
        let item = { danhmuc, diadiem_ten, diadiem_url, diadiem_kinhdo, diadiem_vido, diadiem_mota, diadiem_created: today, diadiem_updated: today, hinhanhs: hinhanh };

        let res = await fetch("http://localhost:20175/api/Address", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/jsxon"
            },
            body: JSON.stringify(item)
        });
        res = await res.json();
        toast.success('Thêm địa điểm thành công!')
        navigate("/");
    }

    return (
        <section className="h-100 bg-dark">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card p-4" >
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <nav aria-label="breadcrumb" className='mt-4 mx-3'>
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
                                            <li className="breadcrumb-item"><a href="/address/list">Địa điểm</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Thêm địa điểm</li>
                                        </ol>
                                    </nav>
                                    <div className="mb-4 div-fluid pt-3">
                                        <div className="list-img">
                                            <img src="/images/address/addAddress.svg" alt="login form" className="img-fluid mt-1" />
                                            <img src="/images/address/addAddress.svg" alt="login form" className="img-fluid mt-1" />
                                            <img src="/images/address/addAddress.svg" alt="login form" className="img-fluid mt-1" />
                                        </div>
                                        <input type="file" name="file" id="file" className="inputfile" />
                                        <label htmlFor="file">Tải hình ảnh lên</label>
                                    </div>
                                    <div className="mt-4 d-flex justify-content-between">
                                        <label htmlFor="vitri" className="form-label">Vị trí:</label>
                                        <button className="btn btn-outline-darks underline" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Chọn ngay</button>
                                        <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                                            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalToggleLabel2">Bản đồ Việt Nam</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <Map />
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button className="btn btn-outlined-dark" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Back to first</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body pt-5 text-black">
                                        <div>
                                            <div className="mb-2">
                                                <label htmlFor="username" className="form-label">Danh mục địa điểm:</label>
                                                <select className="form-select" onChange={(e) => setDanhmucId(e.target.value)} >
                                                    <option selected disabled>Chọn danh mục địa điểm</option>
                                                    {category && category.map(({ Id, id_danhmuc, danhmuc_ten }) => {
                                                        return (
                                                            <option value={id_danhmuc}>{danhmuc_ten}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="username" className="form-label">Tên địa điểm:</label>
                                                <input type="text" onChange={(e) => setDiadiem_ten(e.target.value)} className="form-control" id="username" name="username" require="true" />
                                            </div>

                                            <div>
                                                <label htmlFor="url" className="form-label">Url:</label>
                                                <input type="url" onChange={(e) => setDiadiem_url(e.target.value)} className="form-control" id="url" name="url" require="true" />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="mota" className="form-label">Vui lòng nhập thông chi tiết về địa điểm của bạn:</label>
                                    <textarea rows="8" onChange={(e) => setDiadiem_mota(e.target.value)} className="form-control" id="mota" name="mota" require="true" />
                                </div>
                                <div className="pt-1 mb-2 d-flex justify-content-between">
                                    <Button onClick={add} variant="contained" type="submit">Xác nhận  </Button> 
                                    <p className=" pb-lg-2" >Hủy bỏ thao tác? <Link to="/" className='underline' >Quay về trang chủ </Link></p>
                                 
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddAddress