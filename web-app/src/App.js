import React, { useEffect, useState } from 'react';
//import 'grapesjs/dist/css/grapes.min.css';
import './css/grapes.min.css';
import grapesjs from 'grapesjs';
import gsWebpage from 'grapesjs-preset-webpage';
import gsCustome from 'grapesjs-custom-code';
import gsTap from 'grapesjs-tabs';

import { TablePluginRef } from './Table/consts';
import addTablePlugin from './Table';
import TableComp from './TableComp';
import { ChartPluginRef } from './Chart/consts';
import addChartPlugin from './Chart';

const App = () => {

  const [pluginLoaded, setPluginLoaded] = useState(false);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (!pluginLoaded) {
      addTablePlugin();
      addChartPlugin();
      setPluginLoaded(true);
    }
    else if (!editor) {

      const e = grapesjs.init({
        color: 'white',
        height: '100vh',
        width: 'auto',
        container: '#g',
        fromElement: true,
        plugins: [
          gsWebpage,
          gsCustome,
          gsTap,
          TablePluginRef,
          ChartPluginRef
        ],
        // pluginsOpts: {
        //   grapesjsReact: {
        //     components: { TableComp },
        //   },
        // },
        storageManager: {
          type: 'remote',
          urlStore: 'http://173.249.14.149:3001/api/Dashboards/5ef370de14213070188a41eb/grapes?access_token=B6IES26pZSvpX4J8c8q4wmseASpRtmBOtvXzztH57NDDJXxO94qE7VbtJ7y718GZ',
          urlLoad: 'http://173.249.14.149:3001/api/Dashboards/5ef370de14213070188a41eb/grapes?access_token=B6IES26pZSvpX4J8c8q4wmseASpRtmBOtvXzztH57NDDJXxO94qE7VbtJ7y718GZ',
          autosave: false,
          autoload: true,
          contentTypeJson: true,
          storeComponents: true,
          allowScripts: 1,
          storeStyles: true,
          storeHtml: true,
          storeCss: true,
        },
      });

      // const wrapper = e.DomComponents.addComponent({
      //   name: 'wrapper',
      //   model: {
      //     defaults: {
      //       'custom-name': 'wrapper',
      //       droppable: true,
      //       'data-gjs-blocks': 'text image',
      //     },
      //   },
      // });

      // e.BlockManager.add('custom-block', {
      //   label: 'Custom Block',
      //   content: '<div data-gjs-type="custom-component" data-text="Hello World">Hello World2</div>',
      // });

      // With native logic.
      // e.BlockManager.add('mycustom-table-container', {
      //   label: 'mycustom-table-html',
      //   label: 'mycustom-table-custom',
      //   content:`<table width="100%" border="1" cellpadding="5" cellspacing="5" data-tooltip="mycustom-table" data-name="mycustom-table"
      //       data-gjs-type="table"
      //   >Content of table2</table>`,
      // });

      // With custom logic.
      e.BlockManager.add('mycustom-table-custom', {
        label: 'mycustom-table-custom',
        'category' : 'custom-table',
        content:`<table width="100%" 
            border="2" 
            cellpadding="10" 
            cellspacing="10" 
            data-tooltip="table" 
            data-name="table" 
            data-gjs-type="table"
        ><h1>Hello world</h1></table>`,
        draggable: (e) => {
          console.log('draggable table:', e);
        },
        droppable: (e) => {
          console.log('droppable table:', e);
        },
        // components: [
        //   'mycustom-table-row-tr'
        // ],
      });

      // e.BlockManager.add('mycustom-table-container-full', {
      //   label: 'mycustom-table-full',
      //   content:`<table width="100%" border="1" cellpadding="5" cellspacing="5" data-tooltip="mycustom-table-full" data-name="mycustom-table" data-gjs-type="table"><tr data-gjs-type="mycustom-tr"><td data-gjs-type="mycustom-td">Content of cell/td</td></tr></table>`,
      // });
      //console.log('TR:', document.querySelectorAll('[data-name="mycustom-table"]'));
      
      e.BlockManager.add('mycustom-table-row-tr', {
        'category' : 'custom-table',
        appendTo: document.querySelectorAll('[data-name="mycustom-table"]'),
        label: 'mycustom-table-row-tr',
        content: '<tr data-gjs-type="mycustom-tr"></tr>',
        // content: '<tr data-gjs-type="row"></tr>',
        draggable: (e) => {
          console.log('draggable', e);
        },
        droppable: (e) => {
          console.log('droppable', e);
        },
        components: [
          'mycustom-table-row-td'
        ],
      });

      e.BlockManager.add('mycustom-table-row-td', {
        label: 'mycustom-table-row-td',
        'category' : 'custom-table',
        content: '<td data-gjs-type="mycustom-td"></td>',
        // content: '<td data-gjs-type="cell"></td>',
      });
      //
      e.BlockManager.add('mycustom-table-2-cols', {
        label: 'mycustom-table-2-cols',
        content: `<td width="50%" style="vertical-align: top;" data-gjs-type="custom-component">
          First
          </td>
          <td width="50%" style="vertical-align: top;" data-gjs-type="custom-component">
            Second
          </td>`,
      });
      //
      // e.BlockManager.add('mycustom-table-3-cols', {
      //   label: 'mycustom-table-3-cols',
      //   content: `<td width="33.3333%" style="vertical-align: top;">
      //          First
      //       </td>
      //       <td width="33.3333%" style="vertical-align: top;">
      //         Second
      //       </td>
      //       <td width="33.3333%" style="vertical-align: top;">
      //         Third
      //       </td>`,
      //   });

      // // Global hooks
      // e.on(`component:create`, model => console.log('Global hook: component:create', model.get('type')));
      // // e.on('component:add', component => {
      // //   const tag = component.get('tagName')
      // //   console.log({tag})
      // //   if (tag == 'h1') {
      // //     if (e.getComponents().filter(comp => comp.get('tagName') == tag).length > 1) {
      // //       component.remove()
      // //     }
      // //   }
      // // })
      // e.on(`component:mount`, model => console.log('Global hook: component:mount', model, model.get('type')));
      // e.on(`component:update:testprop`, model => console.log('Global hook: component:update:testprop', model.get('type')));
      // e.on(`component:remove`, model => console.log('Global hook: component:remove', model.get('type')));
      // // Listen to events
      // e.on('block:add', (block) => {
      //   console.log('block:add',{block})
      // });
      //
      // e.on('block:drag', (block) => {
      //   console.log('block:drag',{block})
      // });
      // e.on('block:drag:start', (block) => {
      //   console.log('block:drag:start',{block})
      // });
      //
      // e.on('block:drag:stop', (block) => {
      //   console.log('block:drag:stop',{block})
      // });
    }

  });

  return (
    <div id="g" className="h"/>
  );
};

export default App;
