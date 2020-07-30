import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import React, { useState, useEffect } from 'react'
import { Row, Col, List, Breadcrumb } from 'antd'
import { CalendarOutlined, FolderOpenOutlined, FireOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import '../static/style/pages/list.css'

import axios from 'axios'
import servicePath from '../config/apiUrl'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import dynamic from 'next/dynamic'

const ParticlesBg = dynamic(
  import('particles-bg'),
  {
    ssr: false   //这个要加上,禁止使用 SSR
  }
)

const MyList = (list) => {
  //解析Markdown配置
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
  const [mylist, setMylist] = useState(list.data)
  useEffect(() => {
    setMylist(list.data)
  })
  useEffect(() => {
    setListTypeName(Router.query.typename)
  })

  const [listTypeName, setListTypeName] = useState('')
  return (
    <div>
      <Head>
        <title>JS威个人前端博客</title>
      </Head>
      <Header />
      {/* <ReactCanvasNest /> */}
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={11}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item><a href="/">{listTypeName}</a></Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span> <CalendarOutlined /> {item.addTime}</span>
                  <span><FolderOpenOutlined /> {item.typeName}</span>
                  <span><FireOutlined /> {item.view_count}人</span>
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
    </div>
  )
}

MyList.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getListById + id).then(
      (res) => {
        console.log('res', res.data, Router)
        resolve(res.data)
      }

    )
  })

  return await promise
}


export default MyList
