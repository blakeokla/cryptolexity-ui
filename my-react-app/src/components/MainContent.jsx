import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const MainContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #1a1a1a;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #fff;
  margin-bottom: 40px;
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 800px;
  position: relative;
`;

const SearchBar = styled.div`
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  border: 1px solid #333;
  transition: all 0.2s ease;
  width: 100%;
  max-width: 800px;
  
  &:focus-within {
    border-color: #4a4a4a;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const SearchInput = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  outline: none;
  &::placeholder {
    color: #666;
  }
`;

const SearchActions = styled.div`
  display: flex;
  gap: 10px;
  color: #666;
`;

const ResponsePage = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const QueryTitle = styled.h2`
  font-size: 24px;
  color: #fff;
  margin: 20px 0;
`;

const SourcesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  max-width: 100%;
`;

const SourcesHeader = styled.div`
  color: #999;
  font-size: 14px;
  margin-bottom: 4px;
`;

const SourceItem = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  color: #999;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #333;
  }
`;

const SourceLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
  &:hover {
    color: #64b5f6;
  }
`;

const SourceIcon = styled.span`
  font-size: 16px;
  min-width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SourceUrl = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ResultContainer = styled.div`
  background-color: #2a2a2a;
  border-radius: 12px;
  border: 1px solid #333;
  padding: 20px;
  color: #fff;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #444;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const FollowUpContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, #1a1a1a 80%, rgba(26, 26, 26, 0));
  z-index: 100;
  
  /* Center the search bar */
  display: flex;
  justify-content: center;
`;

const ChatContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  padding-bottom: 100px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const API_URL = 'http://localhost:8000/ask';

const MarkdownContainer = styled.div`
  color: #fff;
  line-height: 1.6;
  
  /* Style markdown elements */
  h1, h2, h3, h4, h5, h6 {
    margin-top: 1em;
    margin-bottom: 0.5em;
  }
  
  p {
    margin-bottom: 1em;
  }
  
  ul, ol {
    margin-left: 1.5em;
    margin-bottom: 1em;
  }
  
  code {
    background-color: #333;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: monospace;
  }
  
  pre {
    background-color: #333;
    padding: 1em;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1em 0;
  }
  
  blockquote {
    border-left: 4px solid #666;
    margin: 0;
    padding-left: 1em;
    color: #999;
  }
  
  a {
    color: #64b5f6;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ExpandButton = styled.div`
  background-color: transparent;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #64b5f6;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: #90caf9;
  }
`;

// Add a new container for the scrollable sources list
const SourcesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${props => props.expanded && `
    max-height: 300px;
    overflow-y: auto;
    padding-right: 8px;
    
    /* Scrollbar styling */
    &::-webkit-scrollbar {
      width: 8px;
      background-color: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: #444;
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }
  `}
`;

const FadeIn = styled.div`
  animation: fadeIn 0.5s ease-in;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #999;
  
  svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

function MainContent() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showInitialSearch, setShowInitialSearch] = useState(true);
  const [expandedMessageIndex, setExpandedMessageIndex] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const currentQuery = query;
    setQuery('');
    setIsLoading(true);
    setShowInitialSearch(false);

    try {
      const response = await axios({
        method: 'post',
        url: API_URL,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          text: currentQuery,
          sources: true
        }
      });

      setMessages(prev => [...prev, {
        type: 'query',
        text: currentQuery
      }, {
        type: 'response',
        text: response.data.answer,
        sources: response.data.sources || [],
        trace_id: response.data.trace_id
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        type: 'query',
        text: currentQuery
      }, {
        type: 'response',
        text: error.response?.data?.detail || 'An error occurred while fetching the response.',
        sources: []
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const toggleSourcesExpand = (index) => {
    setExpandedMessageIndex(expandedMessageIndex === index ? null : index);
  };

  if (!showInitialSearch || messages.length > 0) {
    return (
      <MainContainer style={{ justifyContent: 'flex-start' }}>
        <ChatContainer>
          <MessageContainer>
            {messages.map((message, index) => (
              message.type === 'response' ? (
                <ResponsePage key={index}>
                  <FadeIn>
                    <QueryTitle>{messages[index - 1]?.text}</QueryTitle>
                    
                    <SourcesContainer>
                      <SourcesHeader>Sources ({message.sources?.length})</SourcesHeader>
                      <SourcesList expanded={expandedMessageIndex === index}>
                        {(expandedMessageIndex === index 
                          ? message.sources 
                          : message.sources?.slice(0, 3)
                        )?.map((source, idx) => (
                          <SourceItem key={idx}>
                            <SourceLink href={source.url} target="_blank" rel="noopener noreferrer">
                              <SourceIcon>🔗</SourceIcon>
                              <SourceUrl>{source.url}</SourceUrl>
                            </SourceLink>
                          </SourceItem>
                        ))}
                      </SourcesList>
                      {message.sources?.length > 3 && (
                        <ExpandButton onClick={() => toggleSourcesExpand(index)}>
                          <SourceIcon>
                            {expandedMessageIndex === index ? '↑' : '↓'}
                          </SourceIcon>
                          <span>
                            {expandedMessageIndex === index 
                              ? 'Show less' 
                              : `Show ${message.sources.length - 3} more sources`}
                          </span>
                        </ExpandButton>
                      )}
                    </SourcesContainer>

                    <ResultContainer>
                      <MarkdownContainer>
                        <ReactMarkdown>
                          {message.text}
                        </ReactMarkdown>
                      </MarkdownContainer>
                    </ResultContainer>
                  </FadeIn>
                </ResponsePage>
              ) : null
            ))}
          </MessageContainer>

          {isLoading && (
            <ResultContainer>
              <LoadingSpinner>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="4" strokeDasharray="30 30" />
                </svg>
                Generating response...
              </LoadingSpinner>
            </ResultContainer>
          )}

          <FollowUpContainer>
            <SearchBar>
              <SearchInput 
                placeholder="Ask follow-up..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <SearchActions>
                <span>🔗</span>
                <span 
                  onClick={handleSubmit}
                  style={{ cursor: 'pointer' }}
                >
                  {isLoading ? '⏳' : '➡️'}
                </span>
              </SearchActions>
            </SearchBar>
          </FollowUpContainer>
        </ChatContainer>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <Title>What do you want to know?</Title>
      <FollowUpContainer>
        <SearchBar>
          <SearchInput 
            placeholder="Ask anything..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <SearchActions>
            <span>Auto</span>
            <span>🌐</span>
            <span>🔗</span>
            <span 
              onClick={handleSubmit} 
              style={{ cursor: 'pointer' }}
            >
              {isLoading ? '⏳' : '➡️'}
            </span>
          </SearchActions>
        </SearchBar>
      </FollowUpContainer>
    </MainContainer>
  );
}

export default MainContent; 