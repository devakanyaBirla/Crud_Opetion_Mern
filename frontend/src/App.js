import './App.css';
import FormArea from './component/FormArea';
import TableArea from './component/TableArea';

function App() {
  return (
    <>
      <div className="container ">
        <h1 className="text-center">User List</h1>
        <FormArea />
        <TableArea />
      </div>
    </>
  );
}

export default App;