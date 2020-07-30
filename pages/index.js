import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List } from 'antd'
import { CalendarOutlined, FolderOpenOutlined, FireOutlined } from '@ant-design/icons'
import '../static/style/pages/index.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import axios from 'axios'
import servicePath from '../config/apiUrl'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'


import dynamic from 'next/dynamic'

const ParticlesBg = dynamic(
  import('particles-bg'),
  {
    ssr: false   //这个要加上,禁止使用 SSR
  }
)



const Home = (list) => {
  const [mylist, setMylist] = useState(list.data)
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }

  });
  useEffect(() => {
    let waifu = document.getElementById('waifu')
    waifu.style.bottom = '50px'
  })

  return (
    <>

      <Head>
        <meta name="keywords" content="前端,博客,技术威,jswei,web,javascript,html,css" />
        <meta name="description" content="前端个人博客,技术威前端个人博客,jswei前端个人博客,分享前端技术" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css"></link>

        <title>首页 | 技术威web前端技术博客</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={11}  >
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: '/detailed', query: { id: item.id } }}><a>{item.title}</a></Link>
                </div>
                <div className="list-icon">
                  <span> <CalendarOutlined /> {item.addTime.substring(0, 10)}</span>
                  <span><FolderOpenOutlined /> {item.typeName}</span>
                  <span><FireOutlined /> {item.view_count}</span>
                </div>
                <div className="list-context"
                  dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                ></div>
              </List.Item>
            )}
          />
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
        </Col>
      </Row>
      <Footer />
      <ParticlesBg type="color" bg={true} />
      <script src="/static/style/components/autoload.js"></script>
    </>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then(
      (res) => {
        console.log('------>', res.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}
export default Home