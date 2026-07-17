# 📘 Panduan Belajar React (Berdasarkan Project MovieFlix)

Selamat! Kamu telah berhasil menyelesaikan project React yang cukup kompleks. Agar kamu bisa benar-benar paham bagaimana React bekerja, file ini akan menjelaskan konsep-konsep inti React (Components, Props, State, Hooks) dengan membedah file-file kode yang baru saja kita buat.

---

## 1. Konsep Dasar React: Components & JSX

Di React, segala sesuatu yang tampil di layar disebut **Component**. Component adalah potongan kode mandiri (seperti fungsi JavaScript) yang mengembalikan apa yang ingin ditampilkan di layar. HTML yang ada di dalam JavaScript ini disebut **JSX**.

### 📄 `src/App.jsx`
Ini adalah *Component* utama dari aplikasi kita.
```jsx
function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <Toast />
    </MovieProvider>
  );
}
```
**Penjelasan:**
- Fungsi `App()` mengembalikan JSX (seperti kode HTML).
- `<NavBar />`, `<Home />`, dan `<Toast />` adalah *Custom Components* yang kita buat sendiri di file lain. React memungkinkan kita menyusun komponen-komponen kecil seperti lego untuk membangun sebuah website.

---

## 2. Mengirim Data antar Komponen: Props

**Props** (singkatan dari *Properties*) adalah cara kita mengirim data dari komponen "Induk" ke komponen "Anak".

### 📄 `src/pages/Home.jsx` (Induk) & `src/components/MovieCard.jsx` (Anak)
Di `Home.jsx`, saat kita menampilkan daftar film, kita memanggil `MovieCard` dan memberikannya data `movie`:
```jsx
// Di dalam Home.jsx
{movies.map((movie) => (
  <MovieCard key={movie.id} movie={movie} />
))}
```

Lalu, di `MovieCard.jsx`, kita menerima `movie` tersebut sebagai parameter:
```jsx
// Di dalam MovieCard.jsx
function MovieCard({ movie }) {
    return (
        <h3>{movie.title}</h3>
        <img src={`...${movie.poster_path}`} alt={movie.title} />
    );
}
```
**Penjelasan:**
- Data `movie` "mengalir" dari `Home` ke `MovieCard`. Di dalam `MovieCard`, kita bisa membaca `{movie.title}` untuk menampilkan judulnya.

---

## 3. Menyimpan Data Interaktif: State (`useState`)

React butuh cara untuk mengingat data yang bisa berubah (misal: apa yang diketik user, daftar film dari API). Untuk itu, kita menggunakan hook `useState`.

### 📄 `src/pages/Home.jsx`
```jsx
const [searchQuery, setSearchQuery] = useState("");
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(false);
```
**Penjelasan:**
- `useState("")` artinya nilai awalnya adalah string kosong.
- `movies` adalah nama variabelnya (daftar film), sedangkan `setMovies` adalah fungsi untuk mengubahnya.
- Setiap kali kita memanggil `setMovies(dataBaru)`, React akan **otomatis me-render ulang (me-refresh) komponen tersebut** di layar untuk menampilkan data yang baru. Inilah sihir utama React!

---

## 4. Menjalankan Kode Sampingan: Effect (`useEffect`)

`useEffect` digunakan untuk menjalankan kode pada momen-momen tertentu, misalnya: "Ambil data film *setelah* halaman pertama kali dimuat" atau "Lakukan pencarian otomatis saat `searchQuery` berubah".

### 📄 `src/pages/Home.jsx`
```jsx
useEffect(() => {
  const fetchMovies = async () => {
    // ... panggil API ...
  };

  const debounceTimer = setTimeout(() => {
    fetchMovies();
  }, 500);

  return () => clearTimeout(debounceTimer);
}, [searchQuery]);
```
**Penjelasan:**
- Bagian `[searchQuery]` di akhir disebut *Dependency Array*. Ini memberitahu React: "Tolong jalankan ulang fungsi ini **hanya** ketika `searchQuery` (teks yang diketik user) berubah".
- Jika dependency array-nya kosong `[]`, maka kode di dalamnya hanya akan dijalankan **sekali saja** saat halaman dibuka.

---

## 5. Berbagi Data Secara Global: Context (`createContext`)

Props sangat bagus untuk mengirim data dari Induk ke Anak. Tapi bagaimana jika datanya (seperti daftar *Favorites*) dibutuhkan oleh banyak komponen di tempat yang berjauhan? (Contoh: `NavBar` butuh tahu jumlah favorit, `MovieCard` butuh tahu apakah dia favorit, `Favorites` butuh data seluruh filmnya).

Mengirim props satu per satu ke setiap komponen akan sangat melelahkan (*Prop Drilling*). Disinilah **Context** masuk!

### 📄 `src/contexts/MovieContext.jsx`
```jsx
const MovieContext = createContext();

export const MovieProvider = ({children}) => {
    // 1. Buat state untuk difavoritkan
    const [favorites, setFavorites] = useState(() => { ... });

    // 2. Fungsi untuk menambah & menghapus
    const addFavorite = (movie) => { ... }
    
    // 3. Gabungkan semua data/fungsi yang ingin dibagikan
    const value = { favorites, addFavorite, removeFavorite, isFavorite };
    
    // 4. Sediakan (Provide) data tersebut ke seluruh aplikasi
    return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
}
```

### 📄 Menggunakan Context di `src/components/MovieCard.jsx`
Komponen manapun yang dibungkus oleh `<MovieProvider>` bisa mengambil data favorit dengan satu baris kode:
```jsx
const { isFavorite, addFavorite, removeFavorite, showToast } = useMovieContext();
```
Ini membuat pengelolaan data global menjadi sangat bersih dan mudah!

---

## 6. Perpindahan Halaman Tanpa Loading: React Router

Pernah sadar kalau saat kamu pindah dari tab `Home` ke `Favorites`, halamannya tidak *loading* / *refresh* putih sama sekali? Itulah hebatnya **Single Page Application (SPA)** yang dibuat menggunakan `react-router-dom`.

### 📄 `src/App.jsx`
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/favorites" element={<Favorites />} />
</Routes>
```
**Penjelasan:**
- Kode ini memberitahu React: "Jika URL di browser berakhiran `/`, tampilkan komponen `<Home />`. Jika URL berakhiran `/favorites`, buang `<Home />` dan ganti dengan komponen `<Favorites />`".
- Hal ini dikombinasikan dengan `<Link to="/favorites">` di dalam `NavBar.jsx` untuk navigasinya.

---

## Kesimpulan
Project MovieFlix ini telah mencakup 80% hal yang biasa dilakukan oleh seorang *React Developer* di dunia nyata setiap harinya:
1. Memecah UI menjadi **Components**.
2. Melempar data menggunakan **Props**.
3. Menyimpan data dan loading state dengan **useState**.
4. Memanggil API eksternal menggunakan **useEffect**.
5. Mengelola data yang kompleks/global menggunakan **Context API** dan **Local Storage**.
6. Membuat rute aplikasi menggunakan **React Router**.

Selamat belajar! Terus eksplorasi kodenya dengan mencoba mengubah sedikit demi sedikit (misal: mengganti teks, merubah styling) untuk melihat efeknya di browser.
