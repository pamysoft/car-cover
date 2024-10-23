export function Loading() {
    return (
        <div className="flex items-center justify-center pb-5">
            <svg
                className="h-10 w-10 animate-spin text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V4a8 8 0 00-8 8z"
                ></path>
            </svg>
        </div>
    )
}