import { useEffect, useState } from 'react'

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

const mockTabs = [
  { id: 'tab1', label: 'Натальная карта' },
  { id: 'tab2', label: 'Динамика' },
  { id: 'tab3', label: 'Транзиты' },
  { id: 'tab4', label: 'Планеты' },
  { id: 'tab5', label: 'Планеты2' },
]

const mockWindows: Record<string, JSX.Element> = {
  tab1: <div style={{ padding: 16 }}>Окно Натальная карта</div>,
  tab2: <div style={{ padding: 16 }}>Окно Динамика</div>,
  tab3: <div style={{ padding: 16 }}>Окно Транзиты</div>,
  tab4: <div style={{ padding: 16 }}>Окно Таблицы</div>,
  tab5: <div style={{ padding: 16 }}>Окно Таблицы</div>,
}

type OpenTab = {
  id: string // уникальный ID (например, tab1-1719491023)
  sourceId: string // исходный tab.id
}

export default function VSCodeLikeLayout() {
  const [openTabs, setOpenTabs] = useState<OpenTab[]>([])
  const [counter, setCounter] = useState(1)

  const handleOpenTab = (sourceId: string) => {
    const newTab: OpenTab = {
      id: `${sourceId}-${counter}`,
      sourceId,
    }
    setOpenTabs([...openTabs, newTab])
    setCounter(counter + 1)
  }

  const handleCloseTab = (idToClose: string) => {
    setOpenTabs(openTabs.filter((tab) => tab.id !== idToClose))
  }

  useEffect(() => {
    handleOpenTab('tab1')
  }, [])

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      {/* Панель вкладок */}
      <div
        style={{
          width: 200,
          background: '#1e1e1e',
          color: 'white',
          padding: '8px 0',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        {mockTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleOpenTab(tab.id)}
            style={{
              background: 'transparent',
              color: 'white',
              border: 'none',
              textAlign: 'left',
              padding: '8px 16px',
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Открытые панели */}
      <PanelGroup
        direction="horizontal"
        style={{ flex: 1, overflow: 'hidden' }}
      >
        {openTabs.map((tab, index) => {
          const label = mockTabs.find((t) => t.id === tab.sourceId)?.label ?? tab.sourceId
          const content = mockWindows[tab.sourceId] ?? <div>Неизвестное окно</div>

          return (
            <div
              key={tab.id}
              style={{ display: 'flex', flexDirection: 'row', flex: 1, minWidth: 0 }}
            >
              <Panel
                defaultSize={100 / openTabs.length}
                minSize={5}
                style={{ overflow: 'hidden' }}
              >
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 12px',
                      background: '#eee',
                      borderBottom: '1px solid #ccc',
                      flexShrink: 0,
                      minWidth: 0,
                    }}
                  >
                    <strong
                      style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      {label}
                    </strong>
                    <button onClick={() => handleCloseTab(tab.id)}>✕</button>
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden', minHeight: 0, minWidth: 0 }}>{content}</div>
                </div>
              </Panel>
              {index < openTabs.length - 1 && (
                <PanelResizeHandle
                  style={{
                    width: 4,
                    background: '#ccc',
                    cursor: 'col-resize',
                  }}
                />
              )}
            </div>
          )
        })}
      </PanelGroup>
    </div>
  )
}
