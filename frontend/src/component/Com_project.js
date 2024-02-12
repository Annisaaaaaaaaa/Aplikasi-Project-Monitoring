import React from 'react';
import './../Css/Project.css';

function Projek() {
  return (
    <div className="container">
      <div className="navbar">
        <div className="welcome">
          <p className="judul">Hi, Ira Humanitas</p>
          <p className="halaman">Admin Project Page</p>
        </div>

        <div className="parent">
          <div className="ds-utama"></div>
          <div className="gambarorg"><img src="Img/image-bg.png" alt="Background" /></div>
          <div className="duatiga">10</div>
          <div className="total">Total Project</div>
          <div className="garis"></div>
        </div>

        <div className="bungkus">
          <div className="group-button">
            <button><i className="fas fa-plus"></i> Tambah</button>
          </div>
          <div className="input-group">
            <input type="search" placeholder="Cari Berdasarkan Nama atau ID..." />
            <img src="img/search.png" alt="Search" />
          </div>
        </div>

        <main className="table" id="customers_table">
          <section className="table__header">
            <thead>
              <tr>
                <th>Id <span className="icon-arrow">&UpArrow;</span></th>
                <th>Title <span className="icon-arrow">&UpArrow;</span></th>
                <th>Project <span className="icon-arrow">&UpArrow;</span></th>
                <th>Uploader <span className="icon-arrow">&UpArrow;</span></th>
                <th>Category <span className="icon-arrow">&UpArrow;</span></th>
              </tr>
            </thead>
          </section>
          <section className="table__body">
            <table>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Noctera co.</td>
                  <td>Ira Humanitas</td>
                  <td>Manager</td>
                  <td>
                    <p className="status delivered">Delivered</p>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Lunariaco</td>
                  <td>Sandiana Zetta</td>
                  <td>Manager</td>
                  <td>
                    <p className="status cancelled">Cancelled</p>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Lunariaco</td>
                  <td>Sandiana Zetta</td>
                  <td>Manager</td>
                  <td>
                    <p className="status cancelled">Cancelled</p>
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Lunariaco</td>
                  <td>Sandiana Zetta</td>
                  <td>Manager</td>
                  <td>
                    <p className="status cancelled">Cancelled</p>
                  </td>
                </tr>
                {/* Add other table rows */}
              </tbody>
            </table>
          </section>
        </main>

        <div className="pagination">
          <ul>
            <li><span><i className="fas fa-angel-left"></i>Prev</span></li>
            <li className="numb"><span>1</span></li>
            <li className="numb"><span>2</span></li>
            <li className="dots"><span>...</span></li>
            <li className="numb"><span>4</span></li>
            <li className="numb"><span>5</span></li>
            <li className="dots"><span>...</span></li>
            <li className="numb"><span>7</span></li>
            {/* Add other pagination elements */}
            <li><span>Next <i className="fas fa-angel-right"></i></span></li>
          </ul>
        </div>
      </div>

      <div className="dashboard-engineer">
        <div className="group-19">
          <div className="text-wrapper-32">About</div>
          <div className="text-wrapper-33">Contact</div>
          <div className="text-wrapper-34">FAQ</div>
        </div>
      </div>

      <div className="group-25">
        <div className="overlap-5">
          <div className="rectangle-10"></div>
          <div className="ellipse-5"></div>
          <div className="text-wrapper-37">Ira Humanitas</div>
          <div className="text-wrapper-38">Admin</div>
        </div>
      </div>
    </div>
  );
}

export default Projek;
