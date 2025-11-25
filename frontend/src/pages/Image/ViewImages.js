import React, { useEffect, useState } from "react";
import ImageService from "../../services/ImageService";

function ViewImages() {
    const [images, setImages] = useState([]);
    const [selected, setSelected] = useState(null);
    const role = localStorage.getItem("role");

    // Pagination
    const [page, setPage] = useState(1);
    const limit = 16;
    const totalPages = Math.ceil(images.length / limit);

    const paginatedImages = images.slice((page - 1) * limit, page * limit);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        try {
            const res = await ImageService.getAllImagesAdmin();
            setImages(res.data);
        } catch (err) {
            console.error("Failed:", err);
        }
    };

    const deleteImage = async (id) => {
        if (!window.confirm("Delete this image?")) return;

        try {
            await ImageService.deleteImage(id);
            load();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="text-success">Image Gallery</h3>

            {/* Grid */}
            <div className="row mt-3">
                {paginatedImages.map((img) => (
                    <div className="col-md-3 mb-4" key={img.id}>
                        <div className="card shadow-sm p-2">
                            <img
                                src={ImageService.getImageUrl(img.id)}
                                className="card-img-top"
                                style={{ height: "80px", objectFit: "cover", cursor: "pointer" }}
                                onClick={() => setSelected(ImageService.getImageUrl(img.id))}
                                alt=""
                            />

                            <div className="card-body p-2 d-flex justify-content-between align-items-center">
                                <span className="fw-bold small text-truncate" style={{ maxWidth: "130px" }}>
                                    {img.fileName}
                                </span>

                                {role === "ADMIN" && (
                                    <button
                                        className="btn btn-danger btn-sm ms-2"
                                        onClick={() => deleteImage(img.id)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center gap-2 mt-3">
                <button
                    className="btn btn-secondary"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Prev
                </button>

                <span className="btn btn-outline-dark disabled">
                    Page {page} of {totalPages}
                </span>

                <button
                    className="btn btn-secondary"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>

            {/* Modal */}
            {selected && (
                <div
                    className="modal show fade"
                    style={{ display: "block", background: "rgba(0,0,0,0.7)" }}
                    onClick={() => setSelected(null)}
                >
                    <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <img src={selected} className="img-fluid" alt="" />
                            <button className="btn btn-secondary" onClick={() => setSelected(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ViewImages;
