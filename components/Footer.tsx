export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="flex items-center justify-center h-20 border-t dark:border-gelap w-full bg-white dark:bg-gelap mt-20">
      <h1 className="text-lg text-black dark:text-white">Copyright 2021 Advis Tasyah Mulia</h1>
    </div>
    
  )
}

export default Footer
