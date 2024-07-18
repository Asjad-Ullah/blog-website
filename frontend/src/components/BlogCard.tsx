import { Link } from 'react-router-dom';

export function BlogCard({ id, authorName, title, content }: { id: string, authorName: string, title: string, content: string }) {
    return (
        <div className="font-poppins px-5">
            <div className='flex justify-start mt-7'>
                <Avatar letter={ authorName }/>
                <div className='flex justify-center flex-col'>
                    <p className='text-xs font-medium text-zinc-900 ml-2'>{authorName}</p>
                </div>
            </div>
            <Link to={`/blog/${id}`} className="cursor-pointer">
                <p className="text-lg sm:text-2xl font-bold mt-4 mb-1">{title}</p>
                <p className="text-sm sm:text-md font-medium text-zinc-500 mb-10">{content.length>=120? content.slice(0,120)+"..." : content}</p>
                <BlogRead content={ content } />
            </Link>
            <div className="border-b-2 border-zinc-100" />
        </div>
    )
}


function BlogRead({content}: {content: string}) {
    return (
        <div>
            <p className='text-xs font-normal text-zinc-400 mb-3'>{`${Math.ceil(content.length / 450)} min read`}</p>
        </div>
    )

}

function Avatar({ letter }: { letter: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{letter[0].toLocaleUpperCase()}</span>
        </div>
    )
}