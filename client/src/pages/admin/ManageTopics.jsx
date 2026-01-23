/*import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function ManageTopics() {
  const [skills, setSkills] = useState([]);
  const [skillId, setSkillId] = useState("");
  const [topics, setTopics] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    content: "",
    id: null,
  });

  
  useEffect(() => {
    const loadSkills = async () => {
      try {
        const res = await axiosInstance.get("/admin/skills");
        console.log("🟢 Skills:", res.data);
        setSkills(Array.isArray(res.data) ? res.data : []);
      } catch {
        alert("Failed to load skills");
      }
    };
    loadSkills();
  }, []);

  
  useEffect(() => {
    if (!skillId) {
      setTopics([]);
      return;
    }
    fetchTopics(skillId);
  }, [skillId]);

  const fetchTopics = async (id) => {
    try {
      const res = await axiosInstance.get(`/admin/topics/skill/${id}`);
      setTopics(Array.isArray(res.data) ? res.data : []);
    } catch {
      setTopics([]);
    }
  };

  
  const openModal = (topic = null) => {
    if (topic) {
      setForm({
        title: topic.title,
        content: topic.content || "",
        id: topic._id,
      });
    } else {
      setForm({ title: "", content: "", id: null });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ title: "", content: "", id: null });
  };


 const saveTopic = async () => {
  if (!form.title.trim()) {
    alert("Topic title required");
    return;
  }

  if (!skillId) {
    alert("Select skill first");
    return;
  }

  setLoading(true);

  try {
    const payload = {
      title: form.title.trim(),
      content: form.content?.trim() || "", // ✅ FIX (IMPORTANT)
    };

    if (form.id) {
      await axiosInstance.put(`/admin/topics/${form.id}`, payload);
    } else {
      await axiosInstance.post("/admin/topics", {
        ...payload,
        skillId,
      });
    }

    await fetchTopics(skillId);
    closeModal();
  } catch (err) {
    alert(err.response?.data?.message || "Save failed");
  } finally {
    setLoading(false);
  }
};

  
  const deleteTopic = async (id) => {
    if (!window.confirm("Delete this topic?")) return;
    try {
      await axiosInstance.delete(`/admin/topics/${id}`);
      fetchTopics(skillId);
    } catch {
      alert("Delete failed");
    }
  };


  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Topics</h2>

      
      <select
        value={skillId}
        onChange={(e) => setSkillId(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      >
        <option value="">Select Skill</option>
        {skills.map((skill) => (
          <option key={skill._id} value={skill._id}>
            {skill.name || skill.title}
          </option>
        ))}
      </select>

      <button
        onClick={() => openModal()}
        style={{ marginLeft: "10px", padding: "8px 14px" }}
      >
        + Add Topic
      </button>

      
      <table
        border="1"
        cellPadding="10"
        style={{ marginTop: "20px", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Topic Title</th>
            <th width="200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {topics.length === 0 ? (
            <tr>
              <td colSpan="2" align="center">
                No topics found
              </td>
            </tr>
          ) : (
            topics.map((t) => (
              <tr key={t._id}>
                <td>{t.title}</td>
                <td>
                  <button onClick={() => openModal(t)}>Edit</button>
                  <button
                    onClick={() => deleteTopic(t._id)}
                    style={{ marginLeft: "8px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      
      {showModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>{form.id ? "Edit Topic" : "Add Topic"}</h3>

            <input
              placeholder="Topic Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              style={inputStyle}
            />

            <textarea
              placeholder="Topic Content"
              rows="5"
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
              style={inputStyle}
            />

            <div style={{ textAlign: "right" }}>
              <button onClick={closeModal}>Cancel</button>
              <button
                onClick={saveTopic}
                disabled={loading}
                style={{ marginLeft: "10px" }}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  width: "400px",
  borderRadius: "6px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  margin: "10px 0",
};
*/



import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function ManageTopics() {
  const [skills, setSkills] = useState([]);
  const [skillId, setSkillId] = useState("");
  const [topics, setTopics] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    content: "",
    id: null,
  });

  /* ================= LOAD SKILLS ================= */
  useEffect(() => {
    axiosInstance
      .get("/admin/skills")
      .then(res => setSkills(Array.isArray(res.data) ? res.data : []))
      .catch(() => alert("Failed to load skills"));
  }, []);

  /* ================= LOAD TOPICS ================= */
  useEffect(() => {
    if (!skillId) {
      setTopics([]);
      return;
    }
    fetchTopics(skillId);
  }, [skillId]);

  const fetchTopics = async (id) => {
    try {
      const res = await axiosInstance.get(`/admin/topics/skill/${id}`);
      setTopics(Array.isArray(res.data) ? res.data : []);
    } catch {
      setTopics([]);
    }
  };

  /* ================= MODAL ================= */
  const openModal = (topic = null) => {
    if (topic) {
      setForm({
        title: topic.title,
        content: topic.content || "",
        id: topic._id,
      });
    } else {
      setForm({ title: "", content: "", id: null });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ title: "", content: "", id: null });
  };

  /* ================= SAVE ================= */
  const saveTopic = async () => {
    if (!form.title.trim()) {
      alert("Topic title required");
      return;
    }
    if (!skillId) {
      alert("Select skill first");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: form.title.trim(),
        content: form.content?.trim() || "",
      };

      if (form.id) {
        await axiosInstance.put(`/admin/topics/${form.id}`, payload);
      } else {
        await axiosInstance.post("/admin/topics", {
          ...payload,
          skillId,
        });
      }

      await fetchTopics(skillId);
      closeModal();
    } catch {
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const deleteTopic = async (id) => {
    if (!window.confirm("Delete this topic?")) return;
    try {
      await axiosInstance.delete(`/admin/topics/${id}`);
      fetchTopics(skillId);
    } catch {
      alert("Delete failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="manage-topics-container">
      <h2 className="manage-topics-title">Manage Topics</h2>

      <div className="toolbar">
        <select
          className="select"
          value={skillId}
          onChange={(e) => setSkillId(e.target.value)}
        >
          <option value="">Select Skill</option>
          {skills.map((s) => (
            <option key={s._id} value={s._id}>
              {s.title || s.name}
            </option>
          ))}
        </select>

        <button className="btn primary" onClick={() => openModal()}>
          + Add Topic
        </button>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Topic Title</th>
              <th className="actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {topics.length === 0 ? (
              <tr>
                <td colSpan="2" className="empty">
                  No topics found
                </td>
              </tr>
            ) : (
              topics.map((t) => (
                <tr key={t._id}>
                  <td>{t.title}</td>
                  <td>
                    <button className="btn small" onClick={() => openModal(t)}>
                      Edit
                    </button>
                    <button
                      className="btn small danger"
                      onClick={() => deleteTopic(t._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{form.id ? "Edit Topic" : "Add Topic"}</h3>

            <div className="modal-body">
              <label>Topic Title</label>
              <input
                className="input"
                placeholder="Enter topic title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <label>Topic Content</label>
              <textarea
                className="textarea"
                placeholder="Write detailed topic content here..."
                value={form.content}
                onChange={(e) =>
                  setForm({ ...form, content: e.target.value })
                }
              />
            </div>

            <div className="modal-actions">
              <button className="btn secondary" onClick={closeModal}>
                Cancel
              </button>
              <button
                className="btn primary"
                onClick={saveTopic}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Topic"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PROFESSIONAL CSS ================= */}
      <style>{`
* {
  box-sizing: border-box;
  font-family: "Inter", system-ui, sans-serif;
}

/* MAIN CONTAINER */
.manage-topics-container {
  max-width: 1000px;
  margin: 40px auto;
  background: #ffffff;
  border-radius: 14px;
  padding: 32px;
  box-shadow: 0 20px 40px rgba(2, 6, 23, 0.12);
  border: 1px solid rgba(2, 6, 23, 0.08);
}

.manage-topics-title {
  font-size: 26px;
  font-weight: 700;
  color: #020617;
  margin-bottom: 24px;
  border-left: 5px solid #4f46e5;
  padding-left: 14px;
}

/* TOOLBAR */
.toolbar {
  display: flex;
  gap: 16px;
  margin-bottom: 28px;
}

/* SELECT */
.select {
  padding: 14px 16px;
  border-radius: 8px;
  border: 1px solid #cbd5f5;
  min-width: 260px;
}

/* TABLE */
.table-wrapper {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(2, 6, 23, 0.08);
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  background: #06103c;
  color: white;
  padding: 14px;
  text-align: left;
}

.table td {
  padding: 14px;
  border-bottom: 1px solid #e5e7eb;
}

.table tr:hover {
  background: #f8fafc;
}

.actions-col {
  width: 220px;
}

.empty {
  text-align: center;
  padding: 20px;
  color: #64748b;
}

/* BUTTONS */
.btn {
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.btn.primary {
  background: #06103e;
  color: white;
}

.btn.primary:hover {
  background: #4f46e5;
}

.btn.small {
  margin-right: 8px;
  background: #06103e;
  color:white;
}

.btn.danger {
  background: #06103e;
  color: white;
}

/* ================= MODAL ================= */

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal {
  background: #ffffff;
  width: 100%;
  max-width: 720px;
  max-height: 85vh;
  border-radius: 16px;
  box-shadow: 0 30px 60px rgba(2, 6, 23, 0.35);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal h3 {
  padding: 22px 28px;
  font-size: 22px;
  font-weight: 700;
  border-bottom: 1px solid rgba(2, 6, 23, 0.08);
  background: #f8fafc;
}

.modal-body {
  padding: 28px;
  overflow-y: auto;
}

.modal-body label {
  display: block;
  margin-bottom: 8px;
  margin-top: 18px;
  font-weight: 600;
}

.input,
.textarea {
  width: 100%;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid #cbd5f5;
}

.textarea {
  min-height: 160px;
  resize: vertical;
}

.modal-actions {
  padding: 20px 28px;
  border-top: 1px solid rgba(2, 6, 23, 0.08);
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  background: #f8fafc;
}

.btn.secondary {
  background: #e5e7eb;
}
`}</style>
    </div>
  );
}
