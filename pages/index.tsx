import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter'
import {materialLight} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import CopyToClipboard from 'react-copy-to-clipboard';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import { ClipboardIcon } from '@heroicons/react/24/outline'

const inter = Inter({ subsets: ['latin'] })

const javaScriptMarkdownCodeblock = `**JavaScript** _code_ example:
 
~~~js
// function that adds "2 numbers" together
const sumTwoNumbers = (num1, num2) => num1 + num2;
 
// call the function
console.log(sumTwoNumbers(1, 2)); // 3
 

// array of users
const users = [
  { name: "John", age: 30 },
  { name: "Jane", age: 28 },
  { name: "Bob", age: 25 },
];
 
// print out the users age 
console.log(users.map(user => user.age)); // [30, 28, 25]
~~~

Time complexity: \`O(N)\`

## Hello

Hi
`;

export default function Home() {
  const [postContent, setPostContent] = useState("")
  const [isCopied, setIsCopied] = useState(false)

  SyntaxHighlighter.registerLanguage('jsx', jsx);

  const setCopied = () => {
    setIsCopied(true)
    setTimeout(() => { setIsCopied(false) }, 1000);
  }

  useEffect(() => {
    let index = 0;
    let response = "";
    const array = javaScriptMarkdownCodeblock.split(" ");
    let interval = setInterval(() => {
      if (index < array.length) {
        response += ` ${array[index++]}`;
        setPostContent(response);
      }
      else clearInterval(interval);
    }, (Math.random() + 5) * 10);
  }, [])

  return (
    <ReactMarkdown
      components={{
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '')
          const data = String(children).replace(/\n$/, '');
          return !inline && match ? (
            <div className="relative">
              <div className="absolute top-1 right-1 z-50 w-fit">
                <CopyToClipboard text={data}>
                  <button onClick={() => setCopied()} className='w-fit bg-transparent border-none py-5 px-10 cursor-pointer text-sm outline-none border-1 border-black rounded-md'>
                    <ClipboardIcon className={`h-6 w-6 ${isCopied ? 'text-white' : 'text-gray-500'} ${isCopied ? 'bg-indigo-600' : 'bg-transparent'} rounded-md p-1`} />
                  </button>
                </CopyToClipboard>
              </div>

              <SyntaxHighlighter
                {...props}
                style={materialLight}
                language={match[1]}
                PreTag="div"
                codeTagProps={{ style: { background: 'transparent', fontSize: 'small' } }} showLineNumbers lineNumberStyle={{ background: 'transparent', borderRight: '1px solid', marginRight: 20 }} customStyle={{ backgroundColor: 'transparent' }}
                >{data}</SyntaxHighlighter>
            </div>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          )
        }
      }}>
        {postContent}
      </ReactMarkdown>
  )
}
