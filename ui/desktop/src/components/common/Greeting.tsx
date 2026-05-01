import { useState } from 'react';
import { useTextAnimator } from '../../hooks/use-text-animator';
import { defineMessages, useIntl } from '../../i18n';

const i18n = defineMessages({
  readyToGetStarted: {
    id: 'greeting.readyToGetStarted',
    defaultMessage: 'SiYuan is ready. What shall we do?',
  },
  whatToWorkOn: {
    id: 'greeting.whatToWorkOn',
    defaultMessage: 'What should SiYuan work on?',
  },
  readyToBuild: {
    id: 'greeting.readyToBuild',
    defaultMessage: 'Ready to build with SiYuan?',
  },
  whatToExplore: {
    id: 'greeting.whatToExplore',
    defaultMessage: 'What should SiYuan explore?',
  },
  whatsOnYourMind: {
    id: 'greeting.whatsOnYourMind',
    defaultMessage: 'What should SiYuan help with?',
  },
  whatShallWeCreate: {
    id: 'greeting.whatShallWeCreate',
    defaultMessage: 'What shall SiYuan create today?',
  },
  whatProjectNeedsAttention: {
    id: 'greeting.whatProjectNeedsAttention',
    defaultMessage: 'What project should SiYuan help with?',
  },
  whatToTackle: {
    id: 'greeting.whatToTackle',
    defaultMessage: 'What should SiYuan tackle?',
  },
  whatNeedsToBeDone: {
    id: 'greeting.whatNeedsToBeDone',
    defaultMessage: 'What should SiYuan do next?',
  },
  whatsThePlan: {
    id: 'greeting.whatsThePlan',
    defaultMessage: 'What is SiYuan helping with today?',
  },
  readyToCreateGreat: {
    id: 'greeting.readyToCreateGreat',
    defaultMessage: 'Ready to create with SiYuan?',
  },
  whatCanBeBuilt: {
    id: 'greeting.whatCanBeBuilt',
    defaultMessage: 'What can SiYuan build today?',
  },
  whatsNextChallenge: {
    id: 'greeting.whatsNextChallenge',
    defaultMessage: 'What should SiYuan tackle next?',
  },
  whatProgress: {
    id: 'greeting.whatProgress',
    defaultMessage: 'What progress can SiYuan make?',
  },
  whatToAccomplish: {
    id: 'greeting.whatToAccomplish',
    defaultMessage: 'What should SiYuan accomplish?',
  },
  whatTaskAwaits: {
    id: 'greeting.whatTaskAwaits',
    defaultMessage: 'What task awaits SiYuan?',
  },
  whatsTheMission: {
    id: 'greeting.whatsTheMission',
    defaultMessage: "What is SiYuan's mission today?",
  },
  whatCanBeAchieved: {
    id: 'greeting.whatCanBeAchieved',
    defaultMessage: 'What can SiYuan achieve?',
  },
  whatProjectReadyToBegin: {
    id: 'greeting.whatProjectReadyToBegin',
    defaultMessage: 'What project should SiYuan begin?',
  },
});

interface GreetingProps {
  className?: string;
  forceRefresh?: boolean;
}

export function Greeting({
  className = 'mt-1 text-4xl font-light animate-in fade-in duration-300',
  forceRefresh = false,
}: GreetingProps) {
  const intl = useIntl();

  const messageDescriptors = [
    i18n.readyToGetStarted,
    i18n.whatToWorkOn,
    i18n.readyToBuild,
    i18n.whatToExplore,
    i18n.whatsOnYourMind,
    i18n.whatShallWeCreate,
    i18n.whatProjectNeedsAttention,
    i18n.whatToTackle,
    i18n.whatToExplore,
    i18n.whatNeedsToBeDone,
    i18n.whatsThePlan,
    i18n.readyToCreateGreat,
    i18n.whatCanBeBuilt,
    i18n.whatsNextChallenge,
    i18n.whatProgress,
    i18n.whatToAccomplish,
    i18n.whatTaskAwaits,
    i18n.whatsTheMission,
    i18n.whatCanBeAchieved,
    i18n.whatProjectReadyToBegin,
  ];

  // Using lazy initializer to generate random greeting on each component instance
  const greeting = useState(() => {
    const randomMessageIndex = Math.floor(Math.random() * messageDescriptors.length);
    return messageDescriptors[randomMessageIndex];
  })[0];

  const greetingText = intl.formatMessage(greeting);
  const messageRef = useTextAnimator({ text: greetingText });

  return (
    <h1 className={className} key={forceRefresh ? Date.now() : undefined}>
      <span ref={messageRef}>{greetingText}</span>
    </h1>
  );
}
