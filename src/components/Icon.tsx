/* eslint-disable react/display-name */
import ArrowRightAngle from 'public/assets/icons/arrow-90.svg';
import ArrowLeft from 'public/assets/icons/icon-arrow-left.svg';
import ArrowRight from 'public/assets/icons/icon-arrow-right.svg';
import Bell from 'public/assets/icons/icon-bell.svg';
import BellOff from 'public/assets/icons/icon-bell-off.svg';
import Bookmark from 'public/assets/icons/icon-bookmark.svg';
import Calendar from 'public/assets/icons/icon-calendar.svg';
import Check from 'public/assets/icons/icon-check.svg';
import ChevronDown from 'public/assets/icons/icon-chevron-down.svg';
import ChevronLeft from 'public/assets/icons/icon-chevron-left.svg';
import ChevronRight from 'public/assets/icons/icon-chevron-right.svg';
import ChevronUp from 'public/assets/icons/icon-chevron-up.svg';
import Clock from 'public/assets/icons/icon-clock.svg';
import CreditCard from 'public/assets/icons/icon-credit-card.svg';
import Download from 'public/assets/icons/icon-download.svg';
import Edit from 'public/assets/icons/icon-edit.svg';
import ExternalLink from 'public/assets/icons/icon-external-link.svg';
import Eye from 'public/assets/icons/icon-eye.svg';
import EyeOff from 'public/assets/icons/icon-eye-off.svg';
import File from 'public/assets/icons/icon-file.svg';
import FileUpload from 'public/assets/icons/icon-file-upload.svg';
import Folder from 'public/assets/icons/icon-folder.svg';
import Heart from 'public/assets/icons/icon-heart.svg';
import Home from 'public/assets/icons/icon-home.svg';
import Instagram from 'public/assets/icons/icon-instagram.svg';
import Link from 'public/assets/icons/icon-link.svg';
import Mail from 'public/assets/icons/icon-mail.svg';
import Map from 'public/assets/icons/icon-map.svg';
import MapPin from 'public/assets/icons/icon-map-pin.svg';
import Menu from 'public/assets/icons/icon-menu.svg';
import Minus from 'public/assets/icons/icon-minus.svg';
import MoreHorizontal from 'public/assets/icons/icon-more-horizontal.svg';
import MoreVertical from 'public/assets/icons/icon-more-vertical.svg';
import Opinion from 'public/assets/icons/icon-opinion.svg';
import Phone from 'public/assets/icons/icon-phone.svg';
import Plus from 'public/assets/icons/icon-plus.svg';
import RefreshCCW from 'public/assets/icons/icon-refresh-ccw.svg';
import Search from 'public/assets/icons/icon-search.svg';
import Send from 'public/assets/icons/icon-send.svg';
import Settings from 'public/assets/icons/icon-settings.svg';
import Share from 'public/assets/icons/icon-share.svg';
import ShoppingCart from 'public/assets/icons/icon-shopping-cart.svg';
import Star from 'public/assets/icons/icon-star.svg';
import Tag from 'public/assets/icons/icon-tag.svg';
import Tick from 'public/assets/icons/icon-tick.svg';
import Trash from 'public/assets/icons/icon-trash.svg';
import Upload from 'public/assets/icons/icon-upload.svg';
import User from 'public/assets/icons/icon-user.svg';
import Warning from 'public/assets/icons/icon-warning.svg';
import WriterUserCircle from 'public/assets/icons/icon-writer-user-circle.svg';
import X from 'public/assets/icons/icon-x.svg';
import Youtube from 'public/assets/icons/icon-youtube.svg';
import Pencil from 'public/assets/svg/pencil.svg';
import VerifiedWriter from 'public/assets/svg/verified_writer.svg';
import { FC, SVGProps } from 'react';

function withStroke<T extends SVGProps<SVGSVGElement>>(
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
): FC<T> {
  return ({ className = '', ...props }) => (
    <Icon className={`stroke-current ${className}`} {...(props as T)} />
  );
}

function withFill<T extends SVGProps<SVGSVGElement>>(
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
): FC<T> {
  return ({ className = '', ...props }) => (
    <Icon className={`fill-current ${className}`} {...(props as T)} />
  );
}

export const Icon = {
  FileUpload: withStroke(FileUpload),
  ArrowLeft: withStroke(ArrowLeft),
  ArrowRight: withStroke(ArrowRight),
  BellOff: withStroke(BellOff),
  Bell: withStroke(Bell),
  Bookmark: withStroke(Bookmark),
  Calendar: withStroke(Calendar),
  Check: withStroke(Check),
  ChevronDown: withStroke(ChevronDown),
  ChevronLeft: withStroke(ChevronLeft),
  ChevronRight: withStroke(ChevronRight),
  ChevronUp: withStroke(ChevronUp),
  Clock: withStroke(Clock),
  CreditCard: withStroke(CreditCard),
  Download: withStroke(Download),
  ExternalLink: withStroke(ExternalLink),
  EyeOff: withStroke(EyeOff),
  Eye: withStroke(Eye),
  File: withStroke(File),
  Folder: withStroke(Folder),
  Heart: withStroke(Heart),
  Home: withStroke(Home),
  Instagram: withStroke(Instagram),
  Link: withStroke(Link),
  Mail: withStroke(Mail),
  MapPin: withStroke(MapPin),
  Map: withStroke(Map),
  Menu: withStroke(Menu),
  Minus: withStroke(Minus),
  MoreHorizontal: withStroke(MoreHorizontal),
  MoreVertical: withStroke(MoreVertical),
  Phone: withStroke(Phone),
  Plus: withStroke(Plus),
  RefreshCCW: withStroke(RefreshCCW),
  Search: withStroke(Search),
  Send: withStroke(Send),
  Settings: withStroke(Settings),
  Share: withStroke(Share),
  ShoppingCart: withStroke(ShoppingCart),
  Star: withStroke(Star),
  Tick: withStroke(Tick),
  Trash: withStroke(Trash),
  Upload: withStroke(Upload),
  User: withStroke(User),
  Warning: withStroke(Warning),
  X: withStroke(X),
  Youtube: withStroke(Youtube),
  ArrowRightAngle: withStroke(ArrowRightAngle),
  Pencil: withStroke(Pencil),
  VerifiedWriter: VerifiedWriter,
  Edit: withFill(Edit),
  Opinion: Opinion,
  WriterUserCircle: WriterUserCircle,
  Tag: Tag,
};
