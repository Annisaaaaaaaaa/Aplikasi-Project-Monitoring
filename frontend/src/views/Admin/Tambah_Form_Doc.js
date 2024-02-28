import React, { useState } from 'react';

const ProjectDocumentForm = () => {
  const [formData, setFormData] = useState({
    project: '',
    uploader: '',
    name: '',
    upload_date: '',
    document_file: '',
    category: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data yang telah disubmit, misalnya mengirim ke server
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Project:</label>
        <input
          type="text"
          name="project"
          value={formData.project}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Uploader:</label>
        <input
          type="text"
          name="uploader"
          value={formData.uploader}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Upload Date:</label>
        <input
          type="date"
          name="upload_date"
          value={formData.upload_date}
          onChange={handleChange}
          multiple
        />
      </div>
      <div>
        <label>Document File:</label>
        <input
          type="file"
          name="document_file"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProjectDocumentForm;
