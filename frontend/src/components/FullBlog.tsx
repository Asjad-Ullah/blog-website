import { Blogs } from "../hooks/index";


export function FullBlog({ blog }: { blog: Blogs }) {
    return (
        
        <div className="grid grid-cols-12 gap-4 px-5 pt-10 lg:px-16 lg:py-16 font-poppins">
            <div className="col-span-12 lg:col-span-9">
                <p className="font-bold text-3xl lg:text-5xl leading-tight">{ blog.title }</p>
                <p className="mt-10 font-medium text-md lg:text-lg text-gray-600 whitespace-pre-wrap">{ blog.content }</p>
            </div>
            <div className="col-span-12 lg:col-span-3 mt-16 lg:mt-0">
                <p className="font-semibold text-gray-500">Author</p>
                <div className="flex justify-start mt-5 mb-5">
                    <Avatar letter={blog.author.name} />
                    <div className="flex justify-center flex-col ">
                        <p className="font-extrabold text-2xl ml-5">{blog.author.name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Avatar({ letter }: { letter: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{letter[0].toLocaleUpperCase()}</span>
        </div>
    )
}