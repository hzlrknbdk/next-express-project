export default function Search() {
    return (
        <div className="flex items-center">
            <input
                type="text"
                placeholder="Search"
                className="w-64 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
        </div>
    );
}
