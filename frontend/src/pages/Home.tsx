import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { VideoIcon } from "@/icons/icon"
export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a href="#" className="flex items-center justify-center">
          <VideoIcon className="h-6 w-6" />
          <span className="sr-only">Video Chat App</span>
        </a>
        {/* <nav className="ml-auto flex gap-4 sm:gap-6">
          <a href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </a>
          <a href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </a>
          <a href="#" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </a>
          <a href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </a>
        </nav> */}
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:py-24 lg:py-20 lg:pb-0">
          <div className="container px-4 md:px-6 space-y-6 md:space-y-10">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:gap-12">
              <div className="space-y-4 my-24 md:space-y-6">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Seamless Video Calls for Your Team
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl lg:text-xl/relaxed dark:text-gray-400">
                  Elevate your remote collaboration with our powerful video chat app. Enjoy crystal-clear calls, screen
                  sharing, and virtual backgrounds.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <a
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  >
                    Start Video Chat
                  </a>
                  <a
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  >
                    Learn More
                  </a>
                </div>
              </div>
              <img
                src="/homeBanner.jpeg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-700">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Elevate Your Video Calls</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our video chat app offers a range of powerful features to enhance your remote collaboration.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Screen Sharing</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Share your screen with participants for seamless collaboration.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Virtual Backgrounds</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Customize your background with virtual images or blur your surroundings.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Recording</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Record your video calls for later review or sharing.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <img
                src="/feature.jpeg"
                width="550"
                height="310"
                alt="Features"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-700">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Hear from our satisfied customers about their experience with our video chat app.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-lg font-bold">John Doe</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Software Engineer</div>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-500 dark:text-gray-400">
                    "The video chat app has been a game-changer for our remote\n team. The quality is outstanding, and
                    the features like\n screen sharing and virtual backgrounds have made our\n meetings much more
                    engaging."
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-lg font-bold">Jane Smith</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Project Manager</div>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-500 dark:text-gray-400">
                    "I've tried several video chat apps, but this one stands\n out. The intuitive interface and reliable
                    performance make\n our team meetings a breeze. I highly recommend it!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">&copy; 2024 Video Chat App. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            About
          </a>
          <a href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </a>
          <a href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms
          </a>
        </nav>
      </footer>
    </div>
  )
}

