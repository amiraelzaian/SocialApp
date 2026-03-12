import styled from "styled-components";
import { useUserStories } from "./useUserStories";
import { useViewStory } from "./useViewStory";
import { useEffect, useRef, useState } from "react";
import {
  HiX,
  HiChevronLeft,
  HiChevronRight,
  HiEye,
  HiTrash,
} from "react-icons/hi";
import ViewsModal from "./ViewsModal";
import { useNavigate } from "react-router-dom";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { useUser } from "../authentication/useUser";
import { useUserProfile } from "../discover/useUserProfile";
import { useDeleteStory } from "./useDeleteStory";
import DeletePopup from "../../ui/DeletePopup";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ProgressBar = styled.div`
  display: flex;
  gap: 4px;
  padding: 10px;
  z-index: 10;
`;

const ProgressSegment = styled.div`
  flex: 1;
  height: 3px;
  border-radius: 2px;
  background: ${({ $active, $done }) =>
    $done
      ? "white"
      : $active
        ? "rgba(255,255,255,0.8)"
        : "rgba(255,255,255,0.3)"};
`;

const Image = styled.img`
  width: 100%;
  flex: 1;
  object-fit: contain;
`;

const Caption = styled.p`
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 30px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 10;
  &:active,
  &:focus {
    outline: none;
  }
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 90px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 10;
  &:active,
  &:focus {
    outline: none;
  }
`;

const NavBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 10;
  outline: none;
  ${({ $right }) => ($right ? "right: 10px;" : "left: 10px;")};
  &:active,
  &:focus {
    outline: none;
  }
`;

const ViewsBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  padding: 2px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 10;
  outline: none;
  &:active,
  &:focus {
    outline: none;
  }
`;

const MessageBtn = styled.button`
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 20px;
  border: 1.5px solid var(--color-brand-600);
  background-color: var(--color-grey-100);
  color: var(--color-brand-600);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  &:hover {
    background: var(--color-brand-600);
    color: white;
  }
`;

function StoryViewer({ userId, onClose }) {
  const { userStories } = useUserStories(userId);
  const { viewStory } = useViewStory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showViewsModal, setShowViewsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { deleteStory } = useDeleteStory();

  const { user } = useUser();
  const { profileUser } = useUserProfile(userId);
  const isOwn = user?.id === profileUser?.id;

  const current = userStories?.[currentIndex];

  //  track viewed stories
  const viewedRef = useRef(new Set());

  //  timer refs
  const timerRef = useRef(null);
  const remainingRef = useRef(15000);
  const startTimeRef = useRef(null);

  //  timer functions
  function startTimer() {
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      if (currentIndex < userStories.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        onClose();
      }
    }, remainingRef.current);
  }

  function pauseTimer() {
    clearTimeout(timerRef.current);
    remainingRef.current -= Date.now() - startTimeRef.current;
  }

  function resumeTimer() {
    startTimer();
  }

  // mark as viewed — only once per story
  useEffect(() => {
    if (current?.id && !viewedRef.current.has(current.id)) {
      viewedRef.current.add(current.id);
      viewStory(current.id);
    }
  }, [current?.id, viewStory]);

  //  auto advance with pause/resume support
  useEffect(() => {
    if (!userStories?.length) return;
    remainingRef.current = 15000; // reset on story change
    startTimer();
    return () => clearTimeout(timerRef.current);
  }, [currentIndex, userStories?.length]);

  if (!current) return null;

  return (
    <Overlay onClick={onClose}>
      <Container
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={pauseTimer}
        onMouseLeave={() =>
          !showViewsModal && !showDeleteModal && resumeTimer()
        }
        onTouchStart={pauseTimer}
        onTouchEnd={() => !showViewsModal && !showDeleteModal && resumeTimer()}
      >
        {/* Progress bars */}
        <ProgressBar>
          {userStories.map((_, i) => (
            <ProgressSegment
              key={i}
              $active={i === currentIndex}
              $done={i < currentIndex}
            />
          ))}
        </ProgressBar>

        <CloseBtn onClick={onClose}>
          <HiX size={25} />
        </CloseBtn>

        {isOwn && (
          <DeleteBtn
            onClick={() => {
              pauseTimer();
              setShowDeleteModal(true);
            }}
          >
            <HiTrash size={25} />
          </DeleteBtn>
        )}

        {currentIndex > 0 && (
          <NavBtn onClick={() => setCurrentIndex((i) => i - 1)}>
            <HiChevronLeft size={35} />
          </NavBtn>
        )}

        <Image src={current.image_url} alt={current.caption} />

        {currentIndex < userStories.length - 1 && (
          <NavBtn $right onClick={() => setCurrentIndex((i) => i + 1)}>
            <HiChevronRight size={35} />
          </NavBtn>
        )}

        {current.caption && <Caption>{current.caption}</Caption>}

        {isOwn && (
          <ViewsBtn
            onClick={() => {
              pauseTimer();
              setShowViewsModal(true);
            }}
          >
            <HiEye size={24} /> {current.viewCount}
          </ViewsBtn>
        )}

        {showViewsModal && isOwn && (
          <ViewsModal
            onClose={() => {
              setShowViewsModal(false);
              resumeTimer();
            }}
            story={current}
          />
        )}

        {showDeleteModal && (
          <DeletePopup
            onClose={() => {
              setShowDeleteModal(false);
              resumeTimer();
            }}
            message="Are you sure you want to delete this story?"
            onConfirm={() =>
              deleteStory(
                { storyId: current.id, imageUrl: current.image_url },
                { onSuccess: onClose },
              )
            }
          />
        )}

        {!isOwn && (
          <MessageBtn
            onClick={() => navigate(`/messages/${current.users?.id}`)}
          >
            <HiOutlineChatBubbleLeftRight size={14} />
            Message
          </MessageBtn>
        )}
      </Container>
    </Overlay>
  );
}

export default StoryViewer;
