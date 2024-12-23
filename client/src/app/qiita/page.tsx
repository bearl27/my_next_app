'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Folder, File, Plus, Settings, ChevronRight, ChevronDown } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"

const initialFolders = [
  { id: '1', name: 'React', articles: [
    { id: '1', title: 'Hooks入門', color: '#61dafb', icon: '⚛️' },
    { id: '2', title: 'Contextの使い方', color: '#61dafb', icon: '🔗' },
  ]},
  { id: '2', name: 'Node.js', articles: [
    { id: '3', title: 'Express vs Koa', color: '#68a063', icon: '🚀' },
  ]},
]

export default function QiitaPage() {
  const [folders, setFolders] = useState(initialFolders)
  const [selectedFolder, setSelectedFolder] = useState(folders[0])
  const [expandedFolders, setExpandedFolders] = useState<string[]>([])

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev =>
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    )
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 border-r p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">フォルダ</h2>
        <ScrollArea className="flex-grow">
          {folders.map(folder => (
            <div key={folder.id} className="mb-2">
              <div
                className="flex items-center cursor-pointer hover:bg-accent hover:text-accent-foreground p-2 rounded"
                onClick={() => toggleFolder(folder.id)}
              >
                {expandedFolders.includes(folder.id) ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                <Folder size={18} className="mr-2" />
                <span>{folder.name}</span>
              </div>
              {expandedFolders.includes(folder.id) && (
                <div className="ml-6">
                  {folder.articles.map(article => (
                    <div
                      key={article.id}
                      className="flex items-center cursor-pointer hover:bg-accent hover:text-accent-foreground p-2 rounded"
                      onClick={() => setSelectedFolder(folder)}
                    >
                      <File size={16} className="mr-2" />
                      <span>{article.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
        <Button className="mt-4 w-full"><Plus size={18} className="mr-2" /> 新規フォルダ</Button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-6">{selectedFolder.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedFolder.articles.map(article => (
            <Card key={article.id} style={{borderColor: article.color}}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-2">{article.icon}</span>
                  {article.title}
                </CardTitle>
                <CardDescription>Qiita記事</CardDescription>
              </CardHeader>
              <CardContent>
                <p>ここに記事の要約や説明を表示します。</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">開く</Button>
                <Button variant="ghost" size="icon"><Settings size={18} /></Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}