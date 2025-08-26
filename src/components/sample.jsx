
import React from "react";

const Sample = () => (
  <div style={{
    width: '100%',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    background: 'white',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    display: 'inline-flex'
  }}>
    <div style={{
      width: 447,
      height: 386,
      position: 'relative',
      background: 'white',
      overflow: 'hidden',
      borderRadius: 25,
      outline: '1px black solid',
      outlineOffset: '-1px'
    }}>
      <div style={{
        width: 345,
        height: 76,
        left: 102,
        top: 0,
        position: 'absolute',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        color: 'black',
        fontSize: 32,
        fontFamily: 'Inter',
        fontWeight: '400',
        wordWrap: 'break-word'
      }}>
        Modern workplace
      </div>
      <div style={{
        width: 427,
        height: 250,
        left: 9,
        top: 59,
        position: 'absolute',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <span style={{
          color: 'black',
          fontSize: 24,
          fontFamily: 'Inter',
          fontWeight: '400',
          wordWrap: 'break-word'
        }}>
          <br />
          Modern collaboration and streamlined productivity for Aussie teams
          <br />
        </span>
        <span style={{
          color: 'black',
          fontSize: 24,
          fontFamily: 'Inter',
          fontWeight: '400',
          wordWrap: 'break-word'
        }}>
          Teams setup & training <br />
          SharePoint intranet design <br />
          Secure email & migration <br />
          File organization & access <br />
          Staff onboarding workflows
        </span>
      </div>
      <div style={{
        width: 50,
        height: 50,
        left: 25,
        top: 13,
        position: 'absolute',
        overflow: 'hidden'
      }}>
        <div style={{
          width: 36.14,
          height: 19.36,
          left: 12.19,
          top: 20.22,
          position: 'absolute',
          outline: '0.75px black solid',
          outlineOffset: '-0.38px'
        }} />
        <div style={{
          width: 34.79,
          height: 25.47,
          left: 1.67,
          top: 10.42,
          position: 'absolute',
          outline: '0.75px black solid',
          outlineOffset: '-0.38px'
        }} />
      </div>
      <div style={{
        width: 174,
        height: 44,
        paddingLeft: 20,
        paddingRight: 20,
        left: 262,
        top: 330,
        position: 'absolute',
        borderRadius: 25,
        outline: '1px #505050 solid',
        outlineOffset: '-1px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        display: 'inline-flex'
      }}>
        <div style={{
          textAlign: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          color: 'black',
          fontSize: 20,
          fontFamily: 'Inter',
          fontWeight: '400',
          wordWrap: 'break-word'
        }}>
          Read more
        </div>
      </div>
    </div>
  </div>
);

export default Sample;
