/*import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./ManageSkills.css";

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [editId, setEditId] = useState(null);

  
  const fetchSkills = async () => {
    try {
      const res = await axiosInstance.get("/admin/skills");
      setSkills(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        const res = await axiosInstance.put(
          `/admin/skills/${editId}`,
          { title: skillName } // ✅ correct
        );

        alert(
          `✅ "${res.data.title}" updated successfully.\n📢 Student Dashboard updated`
        );
      } else {
        const res = await axiosInstance.post("/admin/skills", {
          title: skillName, // ✅ correct
        });

        alert(
          `🎉 "${res.data.title}" added successfully.\n📢 Visible in Student Dashboard`
        );
      }

      setSkillName("");
      setEditId(null);
      fetchSkills();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };


  const handleEdit = (skill) => {
    setSkillName(skill.title); // ✅ FIXED
    setEditId(skill._id);
  };

  
  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${title}"?\nThis will remove it from Student Dashboard.`
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/admin/skills/${id}`);

      alert(
        `🗑️ "${title}" deleted successfully.\n📢 Removed from Student Dashboard`
      );

      fetchSkills();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="manage-skills-container">
      <h2 className="manage-skills-title">Manage Skills</h2>

      <form className="manage-skills-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter skill name"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          required
          className="manage-skills-input"
        />

        <button type="submit" className="manage-skills-submit">
          {editId ? "Update Skill" : "Add Skill"}
        </button>
      </form>

      <ul className="manage-skills-list">
        {skills.map((skill) => (
          <li className="manage-skill-item" key={skill._id}>
            <span className="skill-name">{skill.title}</span>

            <div className="skill-actions">
              <button
                className="edit-btn"
                onClick={() => handleEdit(skill)}
                type="button"
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(skill._id, skill.title)}
                type="button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}*/




import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchSkills = async () => {
    try {
      const res = await axiosInstance.get("/admin/skills");
      setSkills(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        const res = await axiosInstance.put(`/admin/skills/${editId}`, {
          title: skillName,
        });

        alert(`"${res.data.title}" updated successfully`);
      } else {
        const res = await axiosInstance.post("/admin/skills", {
          title: skillName,
        });

        alert(`"${res.data.title}" added successfully`);
      }

      setSkillName("");
      setEditId(null);
      fetchSkills();
    } catch (err) {
      alert("Something went wrong");
    }
  };

  const handleEdit = (skill) => {
    setSkillName(skill.title);
    setEditId(skill._id);
  };

  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Delete "${title}" from system?`
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/admin/skills/${id}`);
      fetchSkills();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="manage-skills-container">
      <h2 className="manage-skills-title">Skill Management</h2>

      <form className="manage-skills-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter skill name"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          required
          className="manage-skills-input"
        />

        <button type="submit" className="manage-skills-submit">
          {editId ? "Update Skill" : "Add Skill"}
        </button>
      </form>

      <ul className="manage-skills-list">
        {skills.map((skill) => (
          <li className="manage-skill-item" key={skill._id}>
            <span className="skill-name">{skill.title}</span>

            <div className="skill-actions">
              <button
                className="edit-btn"
                onClick={() => handleEdit(skill)}
                type="button"
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(skill._id, skill.title)}
                type="button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* ====== PROFESSIONAL STYLES ====== */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: "Inter", system-ui, sans-serif;
        }

        .manage-skills-container {
          max-width: 900px;
          margin: 40px auto;
          background: #ffffff;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 20px 40px rgba(2, 6, 23, 0.12);
          border: 1px solid rgba(2, 6, 23, 0.08);
        }

        .manage-skills-title {
          font-size: 26px;
          font-weight: 700;
          color: #020617;
          margin-bottom: 24px;
          border-left: 5px solid #4f46e5;
          padding-left: 14px;
        }

        .manage-skills-form {
          display: flex;
          gap: 16px;
          margin-bottom: 28px;
        }

        .manage-skills-input {
          flex: 1;
          padding: 14px 16px;
          font-size: 15px;
          border-radius: 8px;
          border: 1px solid #cbd5f5;
          outline: none;
          transition: 0.3s;
        }

        .manage-skills-input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
        }

        .manage-skills-submit {
          padding: 14px 22px;
          background: #020617;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .manage-skills-submit:hover {
          background: #4f46e5;
          transform: translateY(-1px);
        }

        .manage-skills-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .manage-skill-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 18px;
          margin-bottom: 12px;
          border-radius: 10px;
          background: #f8fafc;
          border: 1px solid rgba(2, 6, 23, 0.06);
          transition: 0.25s;
        }

        .manage-skill-item:hover {
          background: #eef2ff;
        }

        .skill-name {
          font-size: 16px;
          font-weight: 600;
          color: #020617;
        }

        .skill-actions {
          display: flex;
          gap: 10px;
        }

        .edit-btn {
          padding: 8px 14px;
          border-radius: 6px;
          border: none;
          background: #4f46e5;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: 0.2s;
        }

        .edit-btn:hover {
          background: #4338ca;
        }

        .delete-btn {
          padding: 8px 14px;
          border-radius: 6px;
          border: none;
          background: #020617;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: 0.2s;
        }

        .delete-btn:hover {
          background: #dc2626;
        }

        @media (max-width: 600px) {
          .manage-skills-form {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
