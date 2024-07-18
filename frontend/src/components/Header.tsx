import{ Link } from 'react-router-dom';

export function Header() {
  const username: string = localStorage.getItem("username") || "";
  return (
    <div >
      <div className="bg-black flex justify-between">
        <Link to={"/blogs"} className='cursor-pointer'>
           <p className="text-white font-poppins font-extrabold text-2xl pl-4 p-2 rounded-md">
                    Blog<span className="text-[#39ff14]">*</span>
          </p>
        </Link>
        <div className='flex justify-center items-center'>
            <Link to={"/publish"}>
              <button className="text-black font-poppins text-sm font-bold bg-[#39ff14] px-4 py-2 rounded-full hover:opacity-75" >Write</button>
          </Link>
          <Avatar letter={username}/>
        </div>
      </div>
    </div>
  )
}

function Avatar({ letter }: { letter: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-9 h-9 mx-4 overflow-hidden rounded-full bg-[#39ff14]">
            <span className="font-bold font-poppins text-black">{letter[0].toLocaleUpperCase()}</span>
        </div>
    )
}