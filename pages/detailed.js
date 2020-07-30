import React, { useState } from 'react'
import Head from 'next/head'
import { Row, Col, Breadcrumb, Affix } from 'antd'
import { CalendarOutlined, FolderOpenOutlined, FireOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import '../static/style/pages/detailed.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import dynamic from 'next/dynamic'
import { StickyContainer, Sticky } from 'react-sticky';

const ParticlesBg = dynamic(
  import('particles-bg'),
  {
    ssr: false   //这个要加上,禁止使用 SSR
  }
)



const Detailed = (props) => {

  const renderer = new marked.Renderer();
  const tocify = new Tocify()
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  marked.setOptions({
    renderer: renderer, //这个是必须填写的，你可以通过自定义的Renderer渲染出自定义的格式
    gfm: true, //启动类似Github样式的Markdown,填写true或者false
    pedantic: false,//只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
    sanitize: false,//原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
    tables: true,//支持Github形式的表格，必须打开gfm选项
    breaks: true,// 支持Github换行符，必须打开gfm选项，填写true或者false
    smartLists: true,//优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    }
  })

  let html = marked(props.article_content)
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <StickyContainer>

        <Sticky>{({ style }) => <div style={{ ...style, zIndex: 1000 }}><Header /></div>}</Sticky>
        <div>
          <Row className="comm-main" type="flex" justify="center">
            <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={11}   >
              <div>
                <div className="bread-div">
                  <Breadcrumb>
                    <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                    <Breadcrumb.Item><a href={"/list?id=" + props.typeId}>{props.typeName}</a></Breadcrumb.Item>
                    <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
                  </Breadcrumb>
                </div>

                <div>
                  <div className="detailed-title">
                    {props.title}
                  </div>

                  <div className="list-icon center">
                    <span><CalendarOutlined />{props.addTime.substring(0, 10)}</span>
                    <span><FolderOpenOutlined />{props.typeName}</span>
                    <span><FireOutlined />{props.view_count}人</span>
                  </div>

                  <div className="detailed-content"
                    dangerouslySetInnerHTML={{ __html: html }}
                  >
                  </div>

                </div>

              </div>
            </Col>

            <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
              <Author />
              <Affix offsetTop={10}>
                <div className="detailed-nav comm-box">
                  <div className="nav-title">文章目录</div>
                  {tocify && tocify.render()}
                </div>
              </Affix>
            </Col>
          </Row>
          <Footer />
          <ParticlesBg type="square" bg={true} />
        </div>
      </StickyContainer>

    </>
  )
}

Detailed.getInitialProps = async (context) => {
  console.log(context.query.id)
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById + id).then(
      (res) => {
        console.log(res)
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}

export default Detailed