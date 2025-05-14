export default function FixedBar() {
    return (
        <div className="fixed top-0 left-0 w-full h-16 bg-white shadow-sm z-50">
            <div className="mx-20 h-full  flex items-center justify-between">
                <div className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                    <img src="/logo.png" alt="logo" className="w-12 h-12" />
                    Jovial
                </div>
                <div className="flex items-center gap-8">
                    <div>Products</div>
                    <div>Features</div>
                    <div>Pricing</div>
                </div>
                <div className="flex items-center">
                    <a href="/signIn"><button className="font-semibold">Log In</button></a>
                    <button className="bg-blue-500 text-white rounded-lg">Get Started</button>
                </div>
            </div>
        </div>
    );
}